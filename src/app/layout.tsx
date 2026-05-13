import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Payzen | Your Financial Command Center",
  description: "Log transactions via WhatsApp, gain total visibility with our intuitive dashboard. The simplest way to track your money.",
  openGraph: {
    title: "Payzen - Financial Tracking Simplified",
    description: "Instant insights from WhatsApp to Web.",
    type: "website",
    locale: "en_US",
    url: "https://payzen-alpha.vercel.app",
    siteName: "Payzen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payzen - Financial Tracking",
    description: "Frictionless financial logging.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
