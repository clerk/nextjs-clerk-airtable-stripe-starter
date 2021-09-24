import Head from "next/head";

import {
    Button,
    Stack,
} from "@chakra-ui/react";

import ProductList from "../client/components/ProductList";
import Cart from '../client/components/Cart';
import CartSummary from '../client/components/CartSummary';

export default function UseShoppingCart() {
    return (
        <>
            <Head>
                <title>Shopping Cart</title>
                <meta name="description" content="Shopping Cart" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <Cart>
                <Stack direction="column" spacing={4}>
                    <CartSummary />
                    <ProductList />
                </Stack>
            </Cart>
        </>
    );
}
