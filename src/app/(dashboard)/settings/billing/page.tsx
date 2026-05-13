export const dynamic = 'force-dynamic';
"use client";

import { useState } from "react";
import { useSubscription } from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Check, CreditCard, Sparkles } from "lucide-react";
import Link from "next/link";

export default function BillingSettings() {
  const { data: sub, isLoading } = useSubscription();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handlePortal = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to open billing portal");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div className="py-12 text-center text-muted-foreground">Loading billing info...</div>;

  const isPro = sub?.status === "ACTIVE";
  const usagePercent = sub?.limit ? (sub.usage / sub.limit) * 100 : 100;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-lg font-medium">Subscription & Billing</h3>
        <p className="text-sm text-muted-foreground">Manage your plan and billing details.</p>
      </div>

      <div className="grid gap-6">
        <Card className={isPro ? "border-primary bg-primary/[0.02]" : ""}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {isPro ? (
                    <>
                      Payzen Pro <Sparkles className="h-4 w-4 text-primary fill-primary" />
                    </>
                  ) : (
                    "Payzen Free"
                  )}
                </CardTitle>
                <CardDescription>
                  {isPro ? "You are currently on the Pro plan." : "You are currently on the Free plan."}
                </CardDescription>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{isPro ? "$9" : "$0"}</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isPro && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Usage</span>
                  <span className="font-medium">{sub?.usage} / {sub?.limit} transactions</span>
                </div>
                <Progress value={usagePercent} className="h-2" />
                <p className="text-xs text-muted-foreground">Usage resets on the 1st of every month.</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {[
                "WhatsApp Transaction Logging",
                "Personal Dashboard & Analytics",
                "Unlimited History",
                isPro ? "Unlimited Transactions" : "100 Transactions/month",
                isPro ? "Priority Support" : "Community Support",
                isPro ? "Advanced PDF Reports" : "Standard CSV Export"
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <Check className={`h-4 w-4 ${isPro ? "text-primary" : "text-green-500"}`} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 mt-4 px-6 py-4">
            {isPro ? (
              <Button variant="outline" onClick={handlePortal} disabled={loading} className="w-full sm:w-auto">
                <CreditCard className="mr-2 h-4 w-4" />
                {loading ? "Opening..." : "Manage Billing & Invoices"}
              </Button>
            ) : (
              <Button asChild className="w-full sm:w-auto">
                <Link href="/pricing">Upgrade to Pro</Link>
              </Button>
            )}
          </CardFooter>
        </Card>

        {!isPro && (
          <Card className="bg-yellow-50/50 border-yellow-100 dark:bg-yellow-900/10 dark:border-yellow-900/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-yellow-800 dark:text-yellow-500 text-base">Running out of transactions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-yellow-700 dark:text-yellow-600">
                The free plan is limited to 100 transactions per month. Once you reach the limit, WhatsApp logging will be paused until the next month.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
