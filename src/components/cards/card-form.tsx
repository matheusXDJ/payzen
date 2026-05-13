"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCardSchema, CreateCardInput } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCard } from "@/hooks/use-cards";
import { useState } from "react";

export function CardForm({ onSuccess }: { onSuccess?: () => void }) {
  const createMutation = useCreateCard();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CreateCardInput>({
    resolver: zodResolver(createCardSchema),
    defaultValues: {
      name: "",
      limit: 1000,
      closingDay: 15,
      dueDay: 20,
      color: "#1e293b",
    },
  });

  const onSubmit = async (data: CreateCardInput) => {
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
        <Label htmlFor="name">Card Name</Label>
        <Input id="name" {...form.register("name")} placeholder="e.g. Nubank Ultravioleta" />
        {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="limit">Credit Limit</Label>
        <Input id="limit" type="number" step="0.01" {...form.register("limit", { valueAsNumber: true })} />
        {form.formState.errors.limit && <p className="text-sm text-destructive">{form.formState.errors.limit.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="closingDay">Closing Day (1-31)</Label>
          <Input id="closingDay" type="number" {...form.register("closingDay", { valueAsNumber: true })} />
          {form.formState.errors.closingDay && <p className="text-sm text-destructive">{form.formState.errors.closingDay.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDay">Due Day (1-31)</Label>
          <Input id="dueDay" type="number" {...form.register("dueDay", { valueAsNumber: true })} />
          {form.formState.errors.dueDay && <p className="text-sm text-destructive">{form.formState.errors.dueDay.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="color">Card Color</Label>
        <Input id="color" type="color" className="h-10 px-2 py-1 w-full" {...form.register("color")} />
      </div>

      <Button type="submit" className="w-full" disabled={createMutation.isPending}>
        {createMutation.isPending ? "Saving..." : "Save Credit Card"}
      </Button>
    </form>
  );
}
