"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema, CreateCategoryInput } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateCategory } from "@/hooks/use-categories";
import { useState } from "react";

interface CategoryFormProps {
  onSuccess?: () => void;
}

export function CategoryForm({ onSuccess }: CategoryFormProps) {
  const createMutation = useCreateCategory();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      icon: "📁",
      color: "#6366f1",
      type: "EXPENSE",
    },
  });

  const onSubmit = async (data: CreateCategoryInput) => {
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
        <Label htmlFor="type">Type</Label>
        <Select 
          onValueChange={(value) => form.setValue("type", value as "INCOME" | "EXPENSE")} 
          defaultValue={form.getValues("type")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EXPENSE">Expense</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...form.register("name")} placeholder="e.g. Groceries" />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icon">Icon (Emoji)</Label>
          <Input id="icon" {...form.register("icon")} placeholder="🍕" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <Input id="color" type="color" className="h-10 px-2 py-1" {...form.register("color")} />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={createMutation.isPending}>
        {createMutation.isPending ? "Saving..." : "Save Category"}
      </Button>
    </form>
  );
}
