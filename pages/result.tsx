import { NextPage } from 'next'
import { useRouter } from 'next/router'

import PrintObject from '../client/components/PrintObject'
import Cart from '../client/components/Cart'
import ClearCart from '../client/components/ClearCart'

import { fetchGetJSON } from '../client/utils/api-helpers';
import useSWR from 'swr';
import Head from "next/head";

import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

const ResultPage: NextPage = () => {
    const router = useRouter()

    // Fetch CheckoutSession from static page via
    // https://nextjs.org/docs/basic-features/data-fetching#static-generation
    const { data, error } = useSWR(
        router.query.session_id
            ? `/api/checkout_sessions/${router.query.session_id}`
            : null,
        fetchGetJSON
    );

    if (error) return <div>failed to load</div>

    return (
        <>
            <Head>
                <title>Shopping Cart</title>
                <meta name="description" content="Shopping Cart" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <SignedIn>
                <h1>Checkout Payment Result</h1>

                <Cart>
                    <ClearCart />
                </Cart>

                <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>

                <h3>CheckoutSession response:</h3>

                <PrintObject content={data ?? 'loading...'} />

            </SignedIn>

            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
}

export default ResultPage;
