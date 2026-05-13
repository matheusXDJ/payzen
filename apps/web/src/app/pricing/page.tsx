import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Payzen",
  description: "Simple, transparent pricing for Payzen. Start free and upgrade when you're ready.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-primary">Payzen</a>
          <div className="flex gap-4">
            <a href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Login</a>
            <a href="/login" className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">Get Started</a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">Start free, upgrade when you need more.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Plan */}
          <div className="border rounded-2xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Free</h2>
              <p className="text-muted-foreground mt-1">Perfect to get started</p>
            </div>
            <div>
              <span className="text-5xl font-bold">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-3 text-sm">
              {["Up to 100 transactions/month", "WhatsApp logging", "Basic categories", "CSV export", "Dashboard analytics", "Google & GitHub login"].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="/login" className="block text-center border rounded-lg py-3 font-medium hover:bg-accent transition-colors">Get Started Free</a>
          </div>

          {/* Pro Plan */}
          <div className="border rounded-2xl p-8 space-y-6 bg-primary/5 border-primary relative">
            <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">COMING SOON</div>
            <div>
              <h2 className="text-2xl font-bold">Pro</h2>
              <p className="text-muted-foreground mt-1">For power users</p>
            </div>
            <div>
              <span className="text-5xl font-bold">$9</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-3 text-sm">
              {["Unlimited transactions", "Everything in Free", "Advanced reports & PDF export", "Credit card management", "Recurring bills tracking", "Priority support", "Multi-currency (soon)", "Team collaboration (soon)"].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-primary">✓</span> {f}
                </li>
              ))}
            </ul>
            <button disabled className="w-full border border-primary/30 rounded-lg py-3 font-medium text-muted-foreground cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Is the free plan really free?", a: "Yes! No credit card required. Start tracking your finances today at zero cost." },
              { q: "How does WhatsApp logging work?", a: "Link your phone number in the settings. Then send a message like 'lunch 25' or 'salary 3000' and Payzen will create the transaction automatically." },
              { q: "When will the Pro plan be available?", a: "We're working hard on it! Sign up for free now and you'll be the first to know when Pro launches." },
            ].map(({ q, a }) => (
              <div key={q} className="border-b pb-6">
                <h3 className="font-semibold mb-2">{q}</h3>
                <p className="text-muted-foreground text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Payzen. Built with ❤️ for better finances.</p>
      </footer>
    </div>
  );
}
