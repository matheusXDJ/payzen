export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { startOfMonth, endOfMonth, startOfYear, endOfYear, subMonths } from "date-fns";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "month"; // "month" or "year"

    const now = new Date();
    const startDate = filter === "year" ? startOfYear(now) : startOfMonth(now);
    const endDate = filter === "year" ? endOfYear(now) : endOfMonth(now);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: session.user.id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        category: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    const income = transactions.filter(t => t.type === "INCOME").reduce((acc, curr) => acc + Number(curr.amount), 0);
    const expense = transactions.filter(t => t.type === "EXPENSE").reduce((acc, curr) => acc + Number(curr.amount), 0);
    const balance = income - expense;

    // Group expenses by category
    const expensesByCategory = transactions
      .filter(t => t.type === "EXPENSE" && t.categoryId)
      .reduce((acc, curr) => {
        const categoryName = curr.category?.name || "Uncategorized";
        const color = curr.category?.color || "#cbd5e1";
        if (!acc[categoryName]) {
          acc[categoryName] = { name: categoryName, value: 0, fill: color };
        }
        acc[categoryName].value += Number(curr.amount);
        return acc;
      }, {} as Record<string, any>);

    const recentTransactions = transactions.slice(0, 5);

    return NextResponse.json({
      overview: {
        income,
        expense,
        balance,
      },
      expensesByCategory: Object.values(expensesByCategory),
      recentTransactions,
    });
  } catch (error) {
    console.error("[DASHBOARD_GET]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
