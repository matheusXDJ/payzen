import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCategoryInput } from "@/types";

export function useCategories(type?: "INCOME" | "EXPENSE") {
  return useQuery({
    queryKey: ["categories", type],
    queryFn: async () => {
      const url = type ? `/api/categories?type=${type}` : "/api/categories";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCategoryInput) => {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create category");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to delete category");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
