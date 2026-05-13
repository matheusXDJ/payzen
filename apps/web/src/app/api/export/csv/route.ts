import { NextRequest, NextResponse } from "next/dist/server/web/spec-extension/request";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@payzen/database";
import { format } from "date-fns";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: session.user.id,
        ...(startDate && endDate && {
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }),
      },
      include: { category: true, creditCard: true },
      orderBy: { date: "desc" },
    });

    const rows = [
      ["Date", "Description", "Type", "Amount", "Category", "Credit Card", "Source"],
      ...transactions.map(t => [
        format(new Date(t.date), "yyyy-MM-dd"),
        t.description,
        t.type,
        Number(t.amount).toFixed(2),
        t.category?.name || "",
        t.creditCard?.name || "",
        t.source || "WEB",
      ]),
    ];

    const csv = rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="payzen-transactions-${format(new Date(), "yyyy-MM-dd")}.csv"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
