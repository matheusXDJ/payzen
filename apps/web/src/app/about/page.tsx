import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2, Heart, Shield, Zap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Payzen",
  description: "Payzen was built to make financial tracking frictionless. Learn about our mission and story.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary tracking-tighter hover:scale-105 transition-transform">
            Payzen
          </Link>
          <div className="flex gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors pt-2">Login</Link>
            <Link href="/login" className="text-sm bg-primary text-primary-foreground px-5 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group w-fit">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          
          <h1 className="text-6xl font-extrabold mb-8 tracking-tighter bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Our mission is to make money <span className="text-primary italic">frictionless</span>.
          </h1>

          <div className="space-y-8 text-xl leading-relaxed text-muted-foreground">
            <p>
              Payzen was born from a simple frustration: most financial apps are too complicated to use consistently.
            </p>

            <p>
              We believe that tracking your money should be as easy as sending a text message. No more opening apps,
              navigating complex menus, and manually filling long forms just to register that you spent $12 on lunch.
            </p>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative border rounded-2xl p-8 bg-card text-card-foreground shadow-2xl">
                <p className="text-2xl font-medium italic mb-4">
                  With Payzen, you just open WhatsApp and type:
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-primary text-3xl font-bold flex items-center justify-between overflow-hidden">
                  <span>"lunch 12"</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary/20" />
                    <div className="w-2 h-2 rounded-full bg-primary/40" />
                    <div className="w-2 h-2 rounded-full bg-primary/60" />
                  </div>
                </div>
                <p className="mt-6 text-base text-muted-foreground">
                  That's it. The transaction is logged, categorized, and reflected in your dashboard instantly.
                </p>
              </div>
            </div>

            <p>
              By removing the barriers to data entry, we empower you to have a clear, real-time view of your financial health without changing your daily habits.
            </p>
          </div>
        </div>

        <div className="mt-32 grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Heart className="h-6 w-6 fill-primary/20" />
            </div>
            <h2 className="text-2xl font-bold">Why we built this</h2>
            <p className="text-muted-foreground leading-relaxed">
              We're a small team of developers who were tired of losing track of small daily expenses. We wanted a tool that worked where we already spent our time: messaging apps.
            </p>
          </div>

          <div className="space-y-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="h-6 w-6 fill-primary/20" />
            </div>
            <h2 className="text-2xl font-bold">Privacy first</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your financial data is sensitive. We use industry-standard encryption and we will never sell your data to third parties. Our business model is simple: if you love the tool, you can upgrade to Pro.
            </p>
          </div>
        </div>

        <div className="mt-32 border-t pt-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Core Values</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { icon: <Zap className="h-5 w-5" />, t: "Frictionless", d: "Every interaction should take seconds, not minutes." },
              { icon: <Shield className="h-5 w-5" />, t: "Private & Secure", d: "Your financial data is yours. We never sell it." },
              { icon: <CheckCircle2 className="h-5 w-5" />, t: "Smart by Default", d: "The app should do the heavy lifting, not you." },
              { icon: <Heart className="h-5 w-5" />, t: "Accessible", d: "Great financial tools for everyone, not just the wealthy." },
            ].map(({ icon, t, d }) => (
              <div key={t} className="flex gap-4 p-6 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 hover:bg-muted/50 transition-all">
                <div className="text-primary mt-1">{icon}</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{t}</h3>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32 p-12 rounded-3xl bg-primary text-primary-foreground text-center space-y-6 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
          <h2 className="text-4xl font-bold tracking-tight">Ready to take control?</h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto text-lg">
            Join thousands of people tracking their finances with zero effort. Start your journey to financial freedom today.
          </p>
          <div className="pt-4">
            <Link href="/login" className="inline-flex h-14 items-center justify-center rounded-full bg-background px-10 text-lg font-bold text-primary hover:bg-background/90 transition-all hover:shadow-2xl hover:scale-105 active:scale-95">
              Get Started for Free
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Payzen. Built with passion.</p>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="mailto:hello@payzen.app" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
