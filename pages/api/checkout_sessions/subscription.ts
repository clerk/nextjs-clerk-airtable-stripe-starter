import { NextApiRequest, NextApiResponse } from "next";

import { formatAmountForStripe } from "../../../utils/stripe-helpers";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  // @ts-ignore
  apiVersion: process.env.STRIPE_API_VERSION!,
});

const currency = process.env.NEXT_PUBLIC_CURRENCY!;
const subscriptionCost = Number(process.env.NEXT_PUBLIC_SUBSCRIPTION_COST!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const amount: number = req.body.amount;

    try {
      // Validate the amount that was passed from the client.
      if (amount != subscriptionCost) {
        throw new Error("Invalid amount.");
      }

      // Create Checkout Session from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            quantity: 1,
            price_data: {
              unit_amount: formatAmountForStripe(subscriptionCost, currency),
              currency: currency,
              product_data: {
                name: "Monthly Subscription",
                description: "Renews automatically",
              },
              recurring: {
                interval: "month",
                interval_count: 1,
              },
            },
          },
        ],
        success_url: `${req.headers.origin}/result?mode=subscription&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/subscription`,
      };

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
