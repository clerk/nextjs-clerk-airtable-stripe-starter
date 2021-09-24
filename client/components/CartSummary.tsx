import React, { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

import { SignedIn, SignedOut } from "@clerk/clerk-react";

import {
    Button,
    Stack,
} from "@chakra-ui/react";

import { fetchPostJSON } from "../utils/api-helpers";

import SignInButton from "./SignInButton";

const CartSummary = () => {
    const [loading, setLoading] = useState(false);
    const [cartEmpty, setCartEmpty] = useState(true);
    const {
        formattedTotalPrice,
        cartCount,
        clearCart,
        cartDetails,
        redirectToCheckout,
    } = useShoppingCart();

    useEffect(() => setCartEmpty(!cartCount), [cartCount]);

    const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
        event
    ) => {
        event.preventDefault();
        setLoading(true);

        const response = await fetchPostJSON(
            '/api/checkout_sessions/cart',
            cartDetails
        );

        if (response.statusCode === 500) {
            console.error(response.message)
            return;
        }

        await redirectToCheckout({ sessionId: response.id });
    }

    return (
        <form onSubmit={handleCheckout}>
            <Stack direction="column" spacing={4}>
                <SignedIn>
                    <div>
                        <h2>Cart summary</h2>

                        <p suppressHydrationWarning>
                            <strong>Number of Items:</strong> {cartCount}
                        </p>

                        <p suppressHydrationWarning>
                            <strong>Total:</strong> {formattedTotalPrice}
                        </p>
                    </div>
                </SignedIn>

                <div>
                    <SignedIn>
                        <Stack spacing={4} direction="row" align="center">
                            <Button variant="outline" onClick={clearCart} disabled={cartEmpty || loading}>
                                Clear cart
                            </Button>

                            <Button variant="outline" type="submit" disabled={cartEmpty || loading}>
                                Checkout
                            </Button>
                        </Stack>
                    </SignedIn>

                    <SignedOut>
                        <SignInButton text="Sign in to manage your cart!" />
                    </SignedOut>
                </div>
            </Stack>
        </form>
    )
}

export default CartSummary;
