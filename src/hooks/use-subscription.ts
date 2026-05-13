import { useQuery } from "@tanstack/react-query";

export function useSubscription() {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await fetch("/api/user/subscription");
      if (!res.ok) throw new Error("Failed to fetch subscription");
      return res.json();
    },
  });
}
