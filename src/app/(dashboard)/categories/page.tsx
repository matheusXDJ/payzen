"use client";
export const dynamic = 'force-dynamic';

import { useState } from "react";
import { useCategories, useDeleteCategory } from "@/hooks/use-categories";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CategoryForm } from "@/components/categories/category-form";
import { Trash2 } from "lucide-react";

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();
  const deleteMutation = useDeleteCategory();
  const [filterType, setFilterType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [open, setOpen] = useState(false);

  const handleDelete = async (id: string, count: number) => {
    if (count > 0) {
      alert("Cannot delete a category that has transactions.");
      return;
    }
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>New Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <CategoryForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-2">
        <Button 
          variant={filterType === "EXPENSE" ? "default" : "outline"} 
          onClick={() => setFilterType("EXPENSE")}
        >
          Expense
        </Button>
        <Button 
          variant={filterType === "INCOME" ? "default" : "outline"} 
          onClick={() => setFilterType("INCOME")}
        >
          Income
        </Button>
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-muted-foreground">Loading categories...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories
            ?.filter((c: any) => c.type === filterType)
            .map((category: any) => (
            <Card key={category.id} className="overflow-hidden">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div 
                    className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {category._count.transactions} transactions
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive opacity-50 hover:opacity-100"
                  onClick={() => handleDelete(category.id, category._count.transactions)}
                  title={category._count.transactions > 0 ? "Cannot delete category in use" : "Delete category"}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
          {categories?.filter((c: any) => c.type === filterType).length === 0 && (
            <div className="col-span-full py-8 text-center text-muted-foreground border rounded-lg border-dashed">
              No {filterType.toLowerCase()} categories found. Create one to get started!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
