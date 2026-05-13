import { prisma } from "@payzen/database";

const DEFAULT_EXPENSE_CATEGORIES = [
  { name: "Food & Drink", icon: "🍽️", color: "#f97316" },
  { name: "Transport", icon: "🚗", color: "#3b82f6" },
  { name: "Housing", icon: "🏠", color: "#8b5cf6" },
  { name: "Health", icon: "💊", color: "#ef4444" },
  { name: "Entertainment", icon: "🎬", color: "#ec4899" },
  { name: "Shopping", icon: "🛍️", color: "#f59e0b" },
  { name: "Education", icon: "📚", color: "#06b6d4" },
  { name: "Other", icon: "📁", color: "#6b7280" },
];

const DEFAULT_INCOME_CATEGORIES = [
  { name: "Salary", icon: "💼", color: "#22c55e" },
  { name: "Freelance", icon: "💻", color: "#10b981" },
  { name: "Investment", icon: "📈", color: "#06b6d4" },
  { name: "Gift", icon: "🎁", color: "#a855f7" },
  { name: "Other Income", icon: "💰", color: "#84cc16" },
];

export async function seedDefaultCategories(userId: string) {
  const existingCount = await prisma.category.count({ where: { userId } });
  if (existingCount > 0) return; // Already seeded

  await prisma.category.createMany({
    data: [
      ...DEFAULT_EXPENSE_CATEGORIES.map(c => ({ ...c, type: "EXPENSE" as const, userId })),
      ...DEFAULT_INCOME_CATEGORIES.map(c => ({ ...c, type: "INCOME" as const, userId })),
    ],
  });
}
