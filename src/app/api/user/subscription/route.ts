export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        subscriptionStatus: true,
        stripePriceId: true,
      },
    });

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const transactionCount = await prisma.transaction.count({
      where: {
        userId: session.user.id,
        createdAt: { gte: startOfMonth },
      },
    });

    return NextResponse.json({
      status: user?.subscriptionStatus || "FREE",
      priceId: user?.stripePriceId,
      usage: transactionCount,
      limit: user?.subscriptionStatus === "ACTIVE" ? null : 100,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
