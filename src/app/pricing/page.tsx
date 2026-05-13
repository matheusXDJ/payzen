"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    if (!session) {
      window.location.href = "/login";
      return;
    }

    setLoading(priceId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(null);
    }
  };

  const proPriceId = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_pro_placeholder";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-primary">Payzen</a>
          <div className="flex gap-4">
            {session ? (
              <a href="/dashboard" className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90">Dashboard</a>
            ) : (
              <>
                <a href="/login" className="text-sm text-muted-foreground hover:text-foreground pt-2">Login</a>
                <a href="/login" className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90">Get Started</a>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">Start free, upgrade when you need more power.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="border rounded-3xl p-8 flex flex-col h-full bg-card shadow-sm">
            <div className="mb-8">
              <h2 className="text-xl font-bold uppercase tracking-wider text-muted-foreground">Free</h2>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-muted-foreground">Perfect for individuals starting out.</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "100 transactions per month",
                "WhatsApp logging",
                "Personal dashboard",
                "Basic categories",
                "CSV Export",
                "Secure data encryption"
              ].map(f => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="h-5 w-5 text-green-500 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Button asChild variant="outline" className="w-full h-12 rounded-xl text-base font-semibold">
              <a href={session ? "/dashboard" : "/login"}>
                {session ? "Current Plan" : "Get Started"}
              </a>
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="border-2 border-primary rounded-3xl p-8 flex flex-col h-full bg-primary/[0.02] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">Most Popular</div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold uppercase tracking-wider text-primary">Pro</h2>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">$9</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-muted-foreground">For power users who want more.</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "Unlimited transactions",
                "Priority WhatsApp processing",
                "Advanced PDF Reports",
                "Credit Card tracking",
                "Recurring Bills management",
                "Detailed monthly insights",
                "Priority email support"
              ].map(f => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>

            <Button 
              onClick={() => handleCheckout(proPriceId)}
              disabled={loading === proPriceId}
              className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20"
            >
              {loading === proPriceId ? "Processing..." : "Upgrade to Pro"}
            </Button>
          </div>
        </div>

        <div className="mt-24 text-center">
          <p className="text-muted-foreground mb-8">Trusted by people who care about their financial freedom.</p>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40">
            <div className="text-2xl font-black italic">VISA</div>
            <div className="text-2xl font-black italic">Mastercard</div>
            <div className="text-2xl font-black italic">PayPal</div>
            <div className="text-2xl font-black italic">Stripe</div>
          </div>
        </div>
      </main>

      <footer className="border-t py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Payzen. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="/about" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="mailto:support@payzen.app" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
