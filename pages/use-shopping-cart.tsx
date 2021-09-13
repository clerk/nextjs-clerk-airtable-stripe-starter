import Head from "next/head";

import { useClerk } from "@clerk/clerk-react";

import {
    Button,
    Stack,
} from "@chakra-ui/react";

import ProductList from "../client/components/ProductList";
import Cart from '../client/components/Cart';
import CartSummary from '../client/components/CartSummary';

export default function Index() {
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

const SignInButton = () => {
    const { openSignIn } = useClerk();
    return (
        <Button mt="6" variant="outline" onClick={() => openSignIn({})}>
            Sign in to see the list of your resources!
        </Button>
    );
};
