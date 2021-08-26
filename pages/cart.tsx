import {Button} from "@chakra-ui/react";
import {useClerk} from "@clerk/clerk-react";
import Head from "next/head";
import {ProductList} from "../client/components/ProductList";

export default function Index() {
    return (
        <>
            <Head>
                <title>Shopping Cart</title>
                <meta name="description" content="Shopping Cart"/>
                <link rel="icon" href="/favicon.png"/>
            </Head>

            <ProductList/>
        </>
    );
}

const SignInButton = () => {
    const {openSignIn} = useClerk();
    return (
        <Button mt="6" variant="outline" onClick={() => openSignIn({})}>
            Sign in to see the list of your resources!
        </Button>
    );
};
