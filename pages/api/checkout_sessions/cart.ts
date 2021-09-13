import {NextApiRequest, NextApiResponse} from 'next';
import {validateCartItems} from 'use-shopping-cart/utilities';
import {getProducts} from "../../../server/models";
import Stripe from 'stripe';
import {toStripeProduct} from "../../../utils/to-stripe-product";
import {requireSession} from "@clerk/clerk-sdk-node";
import {onError} from "../../../utils/HttpError";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    // @ts-ignore
    apiVersion: process.env.STRIPE_API_VERSION!,
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            // Validate the cart details that were sent from the client.
            const cartItems = req.body;
            const inventory = await getInventory();
            const lineItems = validateCartItems(inventory, cartItems);

            // Create Checkout Sessions from body params.
            const params: Stripe.Checkout.SessionCreateParams = {
                mode: 'payment',
                submit_type: 'pay',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                line_items: lineItems,
                success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/use-shopping-cart`,
            };

            const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);

            res.status(200).json(checkoutSession);
        } catch (err) {
            res.status(500).json({statusCode: 500, message: err.message});
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}

async function getInventory() {
    const productList = await getProducts();
    return productList.map((p) => toStripeProduct(p));
}

export default requireSession(handler, {onError});
