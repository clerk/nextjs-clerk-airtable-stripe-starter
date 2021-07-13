import { Button } from "@chakra-ui/react";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import Head from "next/head";
import { ResourceList } from "../client/components/ResourceList";

export default function Index() {
  return (
    <>
      <Head>
        <title>The Starter</title>
        <meta name="description" content="The starter" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SignedIn>
        <ResourceList />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
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
