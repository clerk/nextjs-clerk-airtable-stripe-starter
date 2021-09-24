import Head from "next/head";

import { DemoCard } from "../client/components/DemoCard";

import {
    SimpleGrid
} from "@chakra-ui/react";
import cart from "./api/checkout_sessions/cart";

export default function Index() {
    const cards = [
        { title: 'Shopping Cart', imageUrl: 'https://source.unsplash.com/800x800/?shopping,cart', path: '/use-shopping-cart' },
        { title: 'Subscription', imageUrl: 'https://source.unsplash.com/800x800/?buy,subscription', path: '/subscription' },
    ];

    return (
        <>
            <Head>
                <title>The Next + Clerk + Airtable + Stripe Starter</title>
                <meta name="description" content="The starter" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <SimpleGrid columns={[2, null, 3]} spacing={5}>
                {
                    cards.map((card, index) => (
                        <DemoCard key={index} title={card.title} imageUrl={card.imageUrl} path={card.path} />
                    ))
                }
            
            </SimpleGrid>

        </>
    );
}
