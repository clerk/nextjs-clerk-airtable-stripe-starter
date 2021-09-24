import Head from "next/head";
import SubscriptionButton from "../client/components/SubscriptionButton";

export default function Subscription() {
    return (
        <>
            <Head>
                <title>Buy Subscription</title>
                <meta name="description" content="Buy Subscription" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <SubscriptionButton/>
        </>
    );
}
