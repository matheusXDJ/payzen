export const dynamic = 'force-dynamic';
"use client";

import { useState } from "react";
import { useTransactions } from "@/hooks/use-transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { ExportModal } from "@/components/export/export-modal";
import Link from "next/link";
import { Download } from "lucide-react";

export default function TransactionsPage() {
  const { data: transactions, isLoading } = useTransactions();
  const [filterType, setFilterType] = useState<"ALL" | "INCOME" | "EXPENSE">("ALL");
  const [open, setOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setExportOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>New Transaction</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
              </DialogHeader>
              <TransactionForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button variant={filterType === "ALL" ? "default" : "outline"} onClick={() => setFilterType("ALL")}>All</Button>
        <Button variant={filterType === "INCOME" ? "default" : "outline"} onClick={() => setFilterType("INCOME")}>Income</Button>
        <Button variant={filterType === "EXPENSE" ? "default" : "outline"} onClick={() => setFilterType("EXPENSE")}>Expense</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">Loading transactions...</div>
          ) : !transactions || transactions.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No transactions found. Create one to get started!</div>
          ) : (
            <div className="space-y-1">
              {transactions
                .filter((t: any) => filterType === "ALL" || t.type === filterType)
                .map((transaction: any) => (
                <Link key={transaction.id} href={`/transactions/${transaction.id}`} className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-accent transition-colors border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{transaction.category?.icon || (transaction.type === "INCOME" ? "💵" : "💸")}</div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(transaction.date), "MMM d, yyyy")}
                        {transaction.category && ` • ${transaction.category.name}`}
                        {transaction.creditCard && ` • ${transaction.creditCard.name}`}
                      </p>
                    </div>
                  </div>
                  <div className={`font-bold ${transaction.type === "INCOME" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type === "INCOME" ? "+" : "-"}${Number(transaction.amount).toFixed(2)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ExportModal open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
}
