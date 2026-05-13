export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { priceId } = await req.json();
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, email: true, stripeCustomerId: true },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Get or create Stripe customer
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: { userId: user.id },
      });
      customerId = customer.id;
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/dashboard?checkout=success`,
      cancel_url: `${baseUrl}/pricing?checkout=cancelled`,
      metadata: { userId: user.id },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[CHECKOUT]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
