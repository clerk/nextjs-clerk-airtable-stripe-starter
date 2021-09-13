import { useRouter } from 'next/router';

import NextLink from "next/link";

import {
    Link,
    Text,
} from "@chakra-ui/react";

type NavigationLinkProps = {
    title: string;
    path: string;
}

export default function NavigationLink({ title, path }: NavigationLinkProps) {
    const router = useRouter();
    const isActive = router.pathname === path;

    return (
        <NextLink href={path} passHref>
            <Link color={isActive ? 'black' : 'blue'}>
                <Text
                    noOfLines={2}
                    fontSize="xl"
                    fontWeight="semibold"
                    lineHeight="short"
                >
                    {title}
                </Text>
            </Link>
        </NextLink>
    );
}
