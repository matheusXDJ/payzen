"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRecurringBillSchema, CreateRecurringBillInput } from "@payzen/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/hooks/use-categories";
import { useCreateRecurringBill } from "@/hooks/use-recurring";
import { useState } from "react";

export function RecurringBillForm({ onSuccess }: { onSuccess?: () => void }) {
  const createMutation = useCreateRecurringBill();
  const { data: categories } = useCategories("EXPENSE");
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CreateRecurringBillInput>({
    resolver: zodResolver(createRecurringBillSchema),
    defaultValues: {
      name: "",
      amount: 0,
      frequency: "MONTHLY",
      startDate: new Date().toISOString().split("T")[0],
      categoryId: "",
    },
  });

  const onSubmit = async (data: CreateRecurringBillInput) => {
    try {
      setError(null);
      await createMutation.mutateAsync(data);
      form.reset();
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="text-sm font-medium text-destructive">{error}</div>}

      <div className="space-y-2">
        <Label htmlFor="name">Bill Name</Label>
        <Input id="name" {...form.register("name")} placeholder="e.g. Netflix" />
        {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" type="number" step="0.01" {...form.register("amount", { valueAsNumber: true })} />
          {form.formState.errors.amount && <p className="text-sm text-destructive">{form.formState.errors.amount.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Select 
            onValueChange={(value) => form.setValue("frequency", value as any)} 
            defaultValue={form.getValues("frequency")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MONTHLY">Monthly</SelectItem>
              <SelectItem value="WEEKLY">Weekly</SelectItem>
              <SelectItem value="YEARLY">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" type="date" {...form.register("startDate")} />
          {form.formState.errors.startDate && <p className="text-sm text-destructive">{form.formState.errors.startDate.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            onValueChange={(value) => form.setValue("categoryId", value === "none" ? "" : value)}
            defaultValue={form.getValues("categoryId") || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {categories?.map((cat: any) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={createMutation.isPending}>
        {createMutation.isPending ? "Saving..." : "Save Recurring Bill"}
      </Button>
    </form>
  );
}
