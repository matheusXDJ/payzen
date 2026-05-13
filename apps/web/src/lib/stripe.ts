import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export const STRIPE_PLANS = {
  PRO_MONTHLY: process.env.STRIPE_PRO_PRICE_ID || "price_placeholder",
};
