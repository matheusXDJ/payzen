"use client";
export const dynamic = 'force-dynamic';

import { useState } from "react";
import { useDashboardOverview } from "@/hooks/use-dashboard";
import { useSubscription } from "@/hooks/use-subscription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";
import { format } from "date-fns";
import Link from "next/link";
import { Progress } from "@/components/ui/progress"; // Assuming progress exists or I will create it

export default function DashboardPage() {
  const [filter, setFilter] = useState<"month" | "year">("month");
  const { data, isLoading } = useDashboardOverview(filter);
  const { data: sub } = useSubscription();

  if (isLoading) {
    return <div className="py-12 text-center text-muted-foreground">Loading dashboard...</div>;
  }

  if (!data) return null;

  const { overview, expensesByCategory, recentTransactions } = data;
  const isFree = sub?.status !== "ACTIVE";
  const usagePercent = sub?.limit ? (sub.usage / sub.limit) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          {isFree && sub && (
            <Card className="bg-primary/5 border-primary/10 px-4 py-2 flex items-center gap-3">
              <div className="text-xs">
                <p className="font-semibold text-primary">Free Plan</p>
                <p className="text-muted-foreground">{sub.usage}/{sub.limit} transactions</p>
              </div>
              <div className="w-20">
                <Progress value={usagePercent} className="h-1.5" />
              </div>
              <Link href="/pricing">
                <Button size="sm" variant="ghost" className="h-7 text-xs px-2">Upgrade</Button>
              </Link>
            </Card>
          )}
          <div className="space-x-2">
            <Button 
              variant={filter === "month" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("month")}
            >
              Month
            </Button>
            <Button 
              variant={filter === "year" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("year")}
            >
              Year
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Number(overview.balance).toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+${Number(overview.income).toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-600">Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-${Number(overview.expense).toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {expensesByCategory.length === 0 ? (
              <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                No expenses found for this period.
              </div>
            ) : (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expensesByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {expensesByCategory.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {recentTransactions.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground py-8">
                No recent transactions
              </div>
            ) : (
              <div className="space-y-6">
                {recentTransactions.map((transaction: any) => (
                  <div key={transaction.id} className="flex items-center">
                    <div 
                      className="flex h-9 w-9 items-center justify-center rounded-full border bg-background text-lg"
                    >
                      {transaction.category?.icon || (transaction.type === "INCOME" ? "💵" : "💸")}
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(transaction.date), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className={`ml-auto font-medium ${transaction.type === "INCOME" ? "text-green-600" : "text-red-600"}`}>
                      {transaction.type === "INCOME" ? "+" : "-"}${Number(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
