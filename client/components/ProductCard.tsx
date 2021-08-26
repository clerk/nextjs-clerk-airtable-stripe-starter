import {Box, Image, Flex, Text, Button} from "@chakra-ui/react";
import {CardLayout} from "./layouts";
import type {ProductRecord} from "../../types";
import {SignedIn, SignedOut, useClerk} from "@clerk/clerk-react";

type ProductCardProps = {
    product: ProductRecord;
};

export function ProductCard({product}: ProductCardProps) {
    return (
        <CardLayout>
            <Flex
                width="100%"
                flexDirection="column"
                alignItems="center"
                padding="20px 0"
                mb={2}
            >
                <Image
                    objectFit="contain"
                    borderRadius="md"
                    alt={product.fields.Name}
                    src={product.fields.Images[0]?.thumbnails?.large?.url}
                />

                <Text
                    noOfLines={2}
                    fontSize="xl"
                    fontWeight="semibold"
                    lineHeight="short"
                >
                    {product.fields.Name}
                </Text>
                <Text>
                    SKU:
                    {product.fields.SKU}
                </Text>

                <Text noOfLines={2} lineHeight="short">
                    {product.fields.Description}
                </Text>

                <Text>
                    {product.fields.Price}
                    {product.fields.Currency}
                </Text>

                <SignedIn>
                    <AddToCartButton/>
                </SignedIn>
                <SignedOut>
                    <SignInButton/>
                </SignedOut>
            </Flex>
        </CardLayout>
    );
}

const AddToCartButton = () => {
    return (
        <Button mt="6" variant="outline">
            Add to cart
        </Button>
    );
}

const SignInButton = () => {
    const {openSignIn} = useClerk();

    return (
        <Button mt="6" variant="outline" onClick={() => openSignIn({})}>
            Sign in to purchase!
        </Button>
    );
};
