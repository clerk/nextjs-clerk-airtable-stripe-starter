import Head from "next/head";

import { DemoCard } from "../client/components/DemoCard";

import {
    SimpleGrid
} from "@chakra-ui/react";

export default function Index() {
    return (
        <>
            <Head>
                <title>The Next + Clerk + Airtable + Starter</title>
                <meta name="description" content="The starter" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <SimpleGrid columns={[2, null, 3]} spacing={5}>
                <DemoCard title="Shopping Cart" imageUrl="https://source.unsplash.com/800x800/?shopping,cart" path="/use-shopping-cart" />
            </SimpleGrid>

        </>
    );
}
