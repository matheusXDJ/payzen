import { NextRequest, NextResponse } from "next/dist/server/web/spec-extension/request";
import { prisma } from "@/lib/prisma";

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN!;

// GET - Webhook verification (Meta requires this)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// POST - Receive WhatsApp messages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const entry = body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;

    if (!messages?.length) {
      return NextResponse.json({ status: "no_message" });
    }

    const message = messages[0];
    const phoneNumber = message?.from ? `+${message.from}` : null;
    const text = message?.text?.body?.trim();

    if (!phoneNumber || !text) {
      return NextResponse.json({ status: "ignored" });
    }

    // Store the raw message for debugging
    const user = await prisma.user.findFirst({
      where: { whatsappPhone: phoneNumber },
    });

    if (!user) {
      // Unknown number - respond with link instructions (response via API is done by the worker)
      await storeMessage(null, phoneNumber, text, "UNKNOWN_USER", null);
      return NextResponse.json({ status: "unknown_user" });
    }

    // Parse the message
    const parsed = parseTransactionMessage(text);

    if (!parsed) {
      await storeMessage(user.id, phoneNumber, text, "PARSE_ERROR", null);
      return NextResponse.json({ status: "parse_error" });
    }

    // Create the transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        type: parsed.type,
        amount: parsed.amount,
        description: parsed.description,
        date: new Date(),
        source: "WHATSAPP",
      },
    });

    await storeMessage(user.id, phoneNumber, text, "PROCESSED", transaction.id);

    return NextResponse.json({ status: "ok", transactionId: transaction.id });
  } catch (error) {
    console.error("[WHATSAPP_WEBHOOK]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// --- Helpers ---

function parseTransactionMessage(text: string): { type: "INCOME" | "EXPENSE"; amount: number; description: string } | null {
  const lowerText = text.toLowerCase();

  // Detect income keywords
  const incomeKeywords = ["recebi", "recebei", "entrada", "income", "ganho", "salario", "salário", "+"];
  const isIncome = incomeKeywords.some(kw => lowerText.startsWith(kw));

  // Extract number from string (e.g. "almoço 25.50" or "25,50 almoço")
  const numberMatch = text.match(/(\d+[.,]?\d*)/);
  if (!numberMatch) return null;

  const amount = parseFloat(numberMatch[1].replace(",", "."));
  if (isNaN(amount) || amount <= 0) return null;

  // Description = everything except the number
  const description = text.replace(numberMatch[0], "").trim() || "Transaction via WhatsApp";

  return {
    type: isIncome ? "INCOME" : "EXPENSE",
    amount,
    description,
  };
}

async function storeMessage(
  userId: string | null,
  phoneNumber: string,
  content: string,
  status: string,
  transactionId: string | null
) {
  try {
    await prisma.whatsAppMessage.create({
      data: {
        phoneNumber,
        message: content,
        parsed: status === "PROCESSED",
        transactionId,
        metadata: { userId, status },
      },
    });
  } catch (e) {
    console.error("[STORE_MESSAGE]", e);
  }
}
