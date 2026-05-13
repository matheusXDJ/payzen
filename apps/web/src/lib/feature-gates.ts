import { NextRequest, NextResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@payzen/database";

const FREE_TRANSACTION_LIMIT = 100;

export async function checkPlanLimits(userId: string): Promise<{ allowed: boolean; reason?: string }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { subscriptionStatus: true },
  });

  // Pro/Active users have no limits
  if (user?.subscriptionStatus === "ACTIVE") {
    return { allowed: true };
  }

  // Count transactions this month for free users
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const count = await prisma.transaction.count({
    where: {
      userId,
      createdAt: { gte: startOfMonth },
    },
  });

  if (count >= FREE_TRANSACTION_LIMIT) {
    return {
      allowed: false,
      reason: `Free plan limit reached (${FREE_TRANSACTION_LIMIT} transactions/month). Upgrade to Pro for unlimited transactions.`,
    };
  }

  return { allowed: true };
}
