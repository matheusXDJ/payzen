export const dynamic = 'force-dynamic';
"use client";

import { useState } from "react";
import { useRecurringBills, useDeleteRecurringBill } from "@/hooks/use-recurring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RecurringBillForm } from "@/components/recurring/recurring-bill-form";
import { Trash2, CalendarClock } from "lucide-react";
import { format } from "date-fns";

export default function RecurringPage() {
  const { data: bills, isLoading } = useRecurringBills();
  const deleteMutation = useDeleteRecurringBill();
  const [open, setOpen] = useState(false);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this recurring bill?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Recurring Bills</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Recurring Bill</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Recurring Bill</DialogTitle>
            </DialogHeader>
            <RecurringBillForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-muted-foreground">Loading bills...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bills?.map((bill: any) => (
            <Card key={bill.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{bill.name}</CardTitle>
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-2xl font-bold">${Number(bill.amount).toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                      {bill.frequency} • Starts {format(new Date(bill.startDate), "MMM d, yyyy")}
                    </p>
                    {bill.category && (
                      <div className="mt-2 text-xs bg-secondary inline-block px-2 py-0.5 rounded">
                        {bill.category.name}
                      </div>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive opacity-50 hover:opacity-100"
                    onClick={() => handleDelete(bill.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {bills?.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground border rounded-lg border-dashed">
              No recurring bills found. Add one to automate your tracking!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
