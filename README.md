# Payzen 💜

> **Financial tracking via WhatsApp, with full visibility in a clean web dashboard.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-monorepo-blue)](https://turbo.build/)
[![Prisma](https://img.shields.io/badge/Prisma-PostgreSQL-green)](https://prisma.io/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black)](https://vercel.com/)

---

## 🎯 What is Payzen?

Payzen is a financial organization SaaS that lets you log expenses and income simply by sending a WhatsApp message:

```
lunch 25
salary 3000
netflix 39.90
recebi 500 freelance
```

Transactions are instantly reflected in your personal dashboard with charts, reports, and real-time insights.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Monorepo | Turborepo |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Auth | NextAuth.js (Google + GitHub) |
| UI | shadcn/ui + Tailwind CSS v4 |
| Charts | Recharts |
| Analytics | PostHog |
| Forms | React Hook Form + Zod |
| State | TanStack Query |
| Payments | Stripe |
| WhatsApp | Meta Business API |

---

## 🏗️ Project Structure

```
payzen/
├── apps/
│   └── web/              # Next.js 15 application
│       ├── src/
│       │   ├── app/      # App Router pages & API routes
│       │   ├── components/
│       │   ├── hooks/
│       │   └── lib/
│       └── vercel.json
├── packages/
│   ├── database/         # Prisma schema & client
│   │   └── prisma/
│   │       └── schema.prisma
│   └── types/            # Shared Zod schemas & TypeScript types
├── .env                  # Environment variables (never commit)
├── turbo.json
└── package.json
```

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/payzen.git
cd payzen
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Supabase connection string (port 6543 - pooler) |
| `DIRECT_URL` | Supabase direct connection (port 5432 - for migrations) |
| `NEXTAUTH_SECRET` | Random secret string for NextAuth |
| `NEXTAUTH_URL` | Your app URL (e.g. `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host (default: `https://us.i.posthog.com`) |
| `WHATSAPP_VERIFY_TOKEN` | Custom token for Meta webhook verification |
| `WHATSAPP_PHONE_NUMBER_ID` | Meta Business phone number ID |
| `WHATSAPP_ACCESS_TOKEN` | Meta Business API access token |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRO_PRICE_ID` | Stripe Price ID for the Pro plan |

### 4. Push database schema

```bash
cd packages/database
npx prisma db push
```

### 5. Run development server

```bash
cd ../..
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🚀

---

## 📱 WhatsApp Integration

To configure the WhatsApp webhook:

1. Create a Meta Business account at [developers.facebook.com](https://developers.facebook.com)
2. Create a WhatsApp Business App
3. Set the webhook URL to: `https://YOUR_DOMAIN/api/webhooks/whatsapp`
4. Set the verify token to match `WHATSAPP_VERIFY_TOKEN` in your `.env`
5. Link your phone number in the app Settings → WhatsApp

### Supported message formats

```
lunch 25               → $25 EXPENSE "lunch"
salary 3000            → $3000 INCOME "salary"
netflix 39.90          → $39.90 EXPENSE "netflix"
recebi 500 freelance   → $500 INCOME "freelance"
```

---

## 💳 Stripe Integration (Post-Launch)

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create a product with a monthly price
3. Copy the Price ID to `STRIPE_PRO_PRICE_ID`
4. Add your Stripe keys to `.env`
5. Set up the webhook endpoint in Stripe Dashboard → `https://YOUR_DOMAIN/api/webhooks/stripe`

---

## 🌐 Deploy on Vercel

1. Push your code to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Select the `apps/web` directory as root (or use the `vercel.json` already configured)
4. Add all environment variables in Vercel Dashboard
5. Deploy!

---

## 📊 API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET/POST` | `/api/transactions` | List / create transactions |
| `GET/PUT/DELETE` | `/api/transactions/[id]` | Get / update / delete transaction |
| `GET/POST` | `/api/categories` | List / create categories |
| `DELETE` | `/api/categories/[id]` | Delete category |
| `GET/POST` | `/api/cards` | List / create credit cards |
| `DELETE` | `/api/cards/[id]` | Delete credit card |
| `GET/POST` | `/api/recurring` | List / create recurring bills |
| `DELETE` | `/api/recurring/[id]` | Delete recurring bill |
| `GET` | `/api/dashboard/overview` | Dashboard stats & charts data |
| `GET` | `/api/export/csv` | Export transactions as CSV |
| `GET` | `/api/export/pdf` | Export transactions as HTML report |
| `GET/PATCH` | `/api/user/phone` | Get / update WhatsApp phone |
| `POST` | `/api/checkout` | Create Stripe checkout session |
| `POST` | `/api/portal` | Open Stripe billing portal |
| `POST` | `/api/webhooks/stripe` | Stripe webhook handler |
| `GET/POST` | `/api/webhooks/whatsapp` | WhatsApp webhook handler |

---

## 📄 License

MIT © Payzen
