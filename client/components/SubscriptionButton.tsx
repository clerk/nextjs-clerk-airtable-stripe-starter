import React, { useState } from 'react';

import { SignedIn, SignedOut } from "@clerk/clerk-react";

import {
    Button,
    Stack,
    Text,
} from "@chakra-ui/react";

import getStripe from '../utils/get-stripejs';
import { fetchPostJSON } from '../utils/api-helpers';

import { formatAmountForDisplay } from '../../utils/stripe-helpers';

import SignInButton from "./SignInButton";

const currency = process.env.NEXT_PUBLIC_CURRENCY!;
const subscriptionCost = Number(process.env.NEXT_PUBLIC_SUBSCRIPTION_COST!);

const SubscriptionButton = () => {
    const [loading, setLoading] = useState(false);

    const subscribe = async () => {
        setLoading(true);

        // Create a Checkout Session.
        const response = await fetchPostJSON('/api/checkout_sessions/subscription', { amount: subscriptionCost });

        if (response.statusCode === 500) {
        console.error(response.message);
        return;
        }

        // Redirect to Checkout.
        const stripe = await getStripe();

        const { error } = await stripe!.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: response.id,
        })

        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        console.warn(error.message);
        setLoading(false);
    }

    return (
        <>
            <SignedIn>
                <Button variant="outline" p={10} onClick={() => subscribe()} disabled={loading}>
                    <Stack direction="column">
                        <Text>
                            Click here to subscribe!
                        </Text>

                        <Text>
                            ({formatAmountForDisplay(subscriptionCost, currency)} / mo)
                        </Text>
                    </Stack>                
                </Button>
            </SignedIn>

            <SignedOut>
                <SignInButton text="Sign in to subscribe!" />
            </SignedOut>

        </>
    );
}

export default SubscriptionButton;
