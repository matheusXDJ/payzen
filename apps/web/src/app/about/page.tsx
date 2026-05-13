import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Payzen",
  description: "Payzen was built to make financial tracking frictionless. Learn about our mission and story.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-primary">Payzen</a>
          <div className="flex gap-4">
            <a href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Login</a>
            <a href="/login" className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">Get Started</a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold mb-6">About Payzen</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-xl leading-relaxed">
            Payzen was born from a simple frustration: most financial apps are too complicated to use consistently.
          </p>

          <p className="leading-relaxed">
            We believe that tracking your money should be as easy as sending a text message. No more opening apps,
            navigating menus, and manually filling forms just to register that you spent $12 on lunch.
          </p>

          <p className="leading-relaxed">
            With Payzen, you just open WhatsApp and type: <strong className="text-foreground">"lunch 12"</strong>.
            That's it. The transaction is logged, categorized, and reflected in your dashboard instantly.
          </p>

          <div className="border rounded-xl p-6 bg-card text-foreground not-prose space-y-3">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              To make personal finance tracking so effortless that everyone — from freelancers to business owners — can
              have total clarity about their money without changing their habits.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-foreground pt-4">Core Values</h2>
          <ul className="space-y-3">
            {[
              { e: "⚡", t: "Frictionless", d: "Every interaction should take seconds, not minutes." },
              { e: "🔒", t: "Private & Secure", d: "Your financial data is yours. We never sell it." },
              { e: "🧠", t: "Smart by Default", d: "The app should do the heavy lifting, not you." },
              { e: "🌍", t: "Accessible", d: "Great financial tools for everyone, not just the wealthy." },
            ].map(({ e, t, d }) => (
              <li key={t} className="flex gap-3">
                <span className="text-2xl">{e}</span>
                <div><strong className="text-foreground">{t}</strong> — {d}</div>
              </li>
            ))}
          </ul>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Get in Touch</h2>
            <p>Have questions, feedback, or ideas? We'd love to hear from you.</p>
            <p className="mt-2">
              📧 <a href="mailto:hello@payzen.app" className="text-primary hover:underline">hello@payzen.app</a>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Payzen. Built with ❤️ for better finances.</p>
      </footer>
    </div>
  );
}
