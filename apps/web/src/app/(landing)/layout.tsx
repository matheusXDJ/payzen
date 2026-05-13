import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payzen | Smart Financial Tracking via WhatsApp",
  description: "Log expenses and income simply by sending a WhatsApp message. Payzen transforms your chats into a powerful financial dashboard with charts, reports, and real-time insights.",
  keywords: ["financial tracking", "expense tracker", "whatsapp finance", "personal finance", "budget app"],
  openGraph: {
    title: "Payzen | Smart Financial Tracking via WhatsApp",
    description: "Log expenses and income simply by sending a WhatsApp message.",
    type: "website",
    locale: "en_US",
    siteName: "Payzen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payzen | Smart Financial Tracking via WhatsApp",
    description: "Log expenses and income simply by sending a WhatsApp message.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
