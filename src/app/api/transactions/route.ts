import { NextRequest, NextResponse } from "next/dist/server/web/spec-extension/request";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createTransactionSchema } from "@/types";
import { z } from "zod";
import { checkPlanLimits } from "@/lib/feature-gates";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: session.user.id,
        ...(type && { type: type as any }),
      },
      orderBy: {
        date: "desc",
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("[TRANSACTIONS_GET]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    const body = createTransactionSchema.parse(json);

    // Check plan limits for free users
    const limitCheck = await checkPlanLimits(session.user.id);
    if (!limitCheck.allowed) {
      return NextResponse.json({ error: limitCheck.reason }, { status: 403 });
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId: session.user.id,
        type: body.type,
        amount: body.amount,
        description: body.description,
        date: body.date ? new Date(body.date) : new Date(),
        categoryId: body.categoryId,
        creditCardId: body.creditCardId,
        recurringBillId: body.recurringBillId,
        source: "WEB",
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation Error", details: error.errors }, { status: 400 });
    }
    console.error("[TRANSACTIONS_POST]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
