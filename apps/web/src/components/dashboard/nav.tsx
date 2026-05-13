"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function UserNav() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium hidden sm:inline-block">
        {session?.user?.name || session?.user?.email}
      </span>
      <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/login" })}>
        Log out
      </Button>
    </div>
  );
}
