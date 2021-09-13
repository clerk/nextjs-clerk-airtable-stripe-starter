import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

import {
    Box,
    Flex,
    Spacer,
    Stack,
} from "@chakra-ui/react";

import SignInButton from "./SignInButton";
import NavigationLink from "./NavigationLink";

export default function Navigation() {
    const links = [
        { title: 'Home', path: '/' },
        { title: 'Shopping cart', path: '/use-shopping-cart' }
    ];

    return (
        <Flex>
            {links.map((link, index) => (
                <Box key={index} mr={2}>
                    <NavigationLink {...link} />
                </Box>
            ))}

            <Spacer />

            <SignedIn>
                <UserButton />
            </SignedIn>

            <SignedOut>
                <SignInButton />
            </SignedOut>
        </Flex>
    );
}
