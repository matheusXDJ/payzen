"use client";
export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useDeleteTransaction } from "@/hooks/use-transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { toast } = useToast();
  const deleteMutation = useDeleteTransaction();
  const [transaction, setTransaction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/transactions/${id}`)
      .then(r => r.json())
      .then(data => {
        setTransaction(data);
        setIsLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    await deleteMutation.mutateAsync(id);
    toast({ title: "Transaction deleted", description: "The transaction has been removed." });
    router.push("/transactions");
  };

  if (isLoading) return <div className="py-12 text-center text-muted-foreground">Loading...</div>;
  if (!transaction || transaction.error) return <div className="py-12 text-center text-muted-foreground">Transaction not found.</div>;

  const isIncome = transaction.type === "INCOME";

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/transactions"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Transaction Details</h2>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <div>
            <CardTitle className="text-xl">{transaction.description}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {format(new Date(transaction.date), "MMMM d, yyyy")}
            </p>
          </div>
          <div className={`text-2xl font-bold ${isIncome ? "text-green-600" : "text-red-600"}`}>
            {isIncome ? "+" : "-"}${Number(transaction.amount).toFixed(2)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Type</p>
              <p className="font-medium capitalize">{transaction.type.toLowerCase()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Source</p>
              <p className="font-medium">{transaction.source || "Web"}</p>
            </div>
            {transaction.category && (
              <div>
                <p className="text-muted-foreground">Category</p>
                <p className="font-medium">{transaction.category.icon} {transaction.category.name}</p>
              </div>
            )}
            {transaction.creditCard && (
              <div>
                <p className="text-muted-foreground">Credit Card</p>
                <p className="font-medium">{transaction.creditCard.name}</p>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>
              <Trash2 className="h-4 w-4 mr-2" />
              {deleteMutation.isPending ? "Deleting..." : "Delete Transaction"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
