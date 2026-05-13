import { ReactNode } from "react";
import Link from "next/link";
import { UserNav } from "@/components/dashboard/nav";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Analytics } from "@/lib/analytics";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  // Identify user in PostHog
  Analytics.identify(session.user.id, session.user.email, session.user.name);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 sm:px-6">
          <MobileNav />
          <Link href="/dashboard" className="flex items-center gap-2 font-bold">
            <span className="text-xl text-primary">Payzen</span>
          </Link>
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:flex">
            <Link
              href="/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Overview
            </Link>
            <Link
              href="/transactions"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Transactions
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Categories
            </Link>
            <Link
              href="/cards"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Cards
            </Link>
            <Link
              href="/recurring"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Recurring
            </Link>
            <Link
              href="/settings/whatsapp"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              WhatsApp
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        {children}
      </main>
    </div>
  );
}
