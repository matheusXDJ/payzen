"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, CheckCircle2, XCircle, Unlink } from "lucide-react";

export default function WhatsAppSettingsPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [savedPhone, setSavedPhone] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/user/phone")
      .then(r => r.json())
      .then(data => {
        if (data.phoneNumber) setSavedPhone(data.phoneNumber);
      });
  }, []);

  const handleLink = async () => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/user/phone", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        setSavedPhone(data.phoneNumber);
        setSuccess("Phone number linked successfully! You can now send messages to Payzen on WhatsApp.");
        setPhoneNumber("");
      }
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlink = async () => {
    if (!confirm("Are you sure you want to unlink your WhatsApp?")) return;
    setIsLoading(true);

    const res = await fetch("/api/user/phone", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: null }),
    });

    if (res.ok) {
      setSavedPhone(null);
      setSuccess("WhatsApp unlinked successfully.");
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">WhatsApp Integration</h2>
        <p className="text-muted-foreground mt-1">Link your WhatsApp number to log transactions by sending a simple message.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Link Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-500" />
              Link Your Number
            </CardTitle>
            <CardDescription>Connect your WhatsApp number to start logging transactions via chat.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {savedPhone ? (
              <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50 dark:bg-green-900/20 border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Linked</p>
                    <p className="text-sm text-muted-foreground">{savedPhone}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleUnlink} disabled={isLoading} className="text-destructive">
                  <Unlink className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {error && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <XCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}
                {success && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    {success}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (International Format)</Label>
                  <Input
                    id="phone"
                    placeholder="+5511999999999"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Include your country code. E.g. Brazil: +55</p>
                </div>
                <Button onClick={handleLink} disabled={isLoading || !phoneNumber} className="w-full">
                  {isLoading ? "Linking..." : "Link WhatsApp"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* How to use */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>Start logging expenses with simple text messages.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-secondary rounded-lg">
                <p className="font-mono font-medium">almoço 25</p>
                <p className="text-muted-foreground text-xs mt-0.5">→ Creates a $25 expense labeled "almoço"</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="font-mono font-medium">salário 3000</p>
                <p className="text-muted-foreground text-xs mt-0.5">→ Creates a $3000 income "salário"</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="font-mono font-medium">netflix 39.90</p>
                <p className="text-muted-foreground text-xs mt-0.5">→ Creates a $39.90 expense "netflix"</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="font-mono font-medium">recebi 500 freelance</p>
                <p className="text-muted-foreground text-xs mt-0.5">→ Creates a $500 income "freelance"</p>
              </div>
            </div>
            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground">
                <strong>Tip:</strong> Send any message starting with "recebi", "entrada", "salário" or "+" to register income. Everything else is an expense.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
