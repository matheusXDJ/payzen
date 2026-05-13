export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createRecurringBillSchema } from "@/types";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const recurringBills = await prisma.recurringBill.findMany({
      where: { userId: session.user.id },
      orderBy: { name: "asc" },
      include: {
        category: true,
      },
    });

    return NextResponse.json(recurringBills);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const json = await req.json();
    const body = createRecurringBillSchema.parse(json);

    const recurringBill = await prisma.recurringBill.create({
      data: {
        userId: session.user.id,
        name: body.name,
        amount: body.amount,
        frequency: body.frequency,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        categoryId: body.categoryId,
      },
    });

    return NextResponse.json(recurringBill, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation Error", details: error.errors }, { status: 400 });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
