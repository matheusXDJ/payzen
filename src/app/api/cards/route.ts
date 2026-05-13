export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createCardSchema } from "@/types";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const cards = await prisma.creditCard.findMany({
      where: { userId: session.user.id },
      orderBy: { name: "asc" },
      include: {
        transactions: {
          where: {
            date: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) // basic current month usage
            }
          },
          select: { amount: true }
        }
      }
    });

    const cardsWithUsage = cards.map(card => {
      const currentUsage = card.transactions.reduce((acc, curr) => acc + Number(curr.amount), 0);
      return { ...card, currentUsage, transactions: undefined }; // remove txns array to save payload
    });

    return NextResponse.json(cardsWithUsage);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const json = await req.json();
    const body = createCardSchema.parse(json);

    const card = await prisma.creditCard.create({
      data: {
        userId: session.user.id,
        ...body,
      },
    });

    return NextResponse.json(card, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation Error", details: error.errors }, { status: 400 });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
