"use client";
import { useQuery } from "@tanstack/react-query";

export function useDashboardOverview(filter: "month" | "year" = "month") {
  return useQuery({
    queryKey: ["dashboard", filter],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/overview?filter=${filter}`);
      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      return res.json();
    },
  });
}
