import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateRecurringBillInput } from "@/types";

export function useRecurringBills() {
  return useQuery({
    queryKey: ["recurring-bills"],
    queryFn: async () => {
      const res = await fetch("/api/recurring");
      if (!res.ok) throw new Error("Failed to fetch recurring bills");
      return res.json();
    },
  });
}

export function useCreateRecurringBill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRecurringBillInput) => {
      const res = await fetch("/api/recurring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create recurring bill");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurring-bills"] });
    },
  });
}

export function useDeleteRecurringBill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/recurring/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to delete recurring bill");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurring-bills"] });
    },
  });
}
