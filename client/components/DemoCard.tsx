import NextLink from "next/link";

import {
    AspectRatio,
    Box,
    Image,
    Text,
    LinkBox,
    LinkOverlay
} from "@chakra-ui/react";

type DemoCardProps = {
    title: string;
    imageUrl: string;
    path: string;
};

export function DemoCard({ title, imageUrl, path }: DemoCardProps) {
    return (
        <LinkBox>
            <Box
                p={4}
                borderWidth={1}
                borderRadius="14px"
                margin={2}
            >
                {/* Note: an AspectRatio element will not render within a Flex component */}
                <AspectRatio ratio={1 / 1} mb={3}>
                    <Image
                        objectFit="contain"
                        borderRadius="md"
                        alt={title}
                        src={imageUrl}
                    />
                </AspectRatio>

                <NextLink href={path} passHref>
                    <LinkOverlay>
                        <Text
                            noOfLines={2}
                            fontSize="xl"
                            fontWeight="semibold"
                            lineHeight="short"
                            align="center"
                        >
                            {title}
                        </Text>
                    </LinkOverlay>
                </NextLink>
            </Box>
        </LinkBox>
    );
}
