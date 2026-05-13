export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("[STRIPE_WEBHOOK] Invalid signature:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== "subscription") break;

        const userId = session.metadata?.userId;
        if (!userId) break;

        await prisma.user.update({
          where: { id: userId },
          data: {
            stripeSubscriptionId: session.subscription as string,
            subscriptionStatus: "ACTIVE",
            subscriptionStartDate: new Date(),
          },
        });
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(sub.customer as string);
        const userId = (customer as Stripe.Customer).metadata?.userId;
        if (!userId) break;

        await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionStatus: sub.status === "active" ? "ACTIVE" : "CANCELED",
            stripePriceId: sub.items.data[0]?.price.id,
          },
        });
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(sub.customer as string);
        const userId = (customer as Stripe.Customer).metadata?.userId;
        if (!userId) break;

        await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionStatus: "CANCELED",
            subscriptionEndDate: new Date(),
          },
        });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customer = await stripe.customers.retrieve(invoice.customer as string);
        const userId = (customer as Stripe.Customer).metadata?.userId;
        if (!userId) break;

        await prisma.user.update({
          where: { id: userId },
          data: { subscriptionStatus: "PAST_DUE" },
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[STRIPE_WEBHOOK]", error);
    return NextResponse.json({ error: "Webhook handler error" }, { status: 500 });
  }
}
