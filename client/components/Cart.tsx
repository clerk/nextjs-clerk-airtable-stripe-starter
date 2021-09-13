import React, { ReactNode } from 'react';
import { CartProvider } from 'use-shopping-cart';

const Cart = ({ children }: { children: ReactNode }) => (
    <CartProvider
        cartMode="checkout-session"
        stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!} // this isn't actually being used for Stripe Checkout
        currency={process.env.NEXT_PUBLIC_CURRENCY!}
    >
        <>{children}</>
    </CartProvider>
);

export default Cart;
