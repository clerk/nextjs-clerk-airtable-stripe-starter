import {
    AspectRatio,
    Box,
    Button,
    Image,
    Stack,
    Text,
} from "@chakra-ui/react";

import SignInButton from "./SignInButton";

import type { ProductRecord } from "../../types";
import { toStripeProduct } from "../../utils/to-stripe-product";

import {
    SignedIn,
    SignedOut,
} from "@clerk/clerk-react";

import {
    useShoppingCart,
    formatCurrencyString,
} from 'use-shopping-cart';

type ProductCardProps = {
    product: ProductRecord;
};

const currency = process.env.NEXT_PUBLIC_CURRENCY!;

export function ProductCard({ product }: ProductCardProps) {
    return (
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
                    alt={product.fields.Name}
                    src={product.fields.Images[0]?.thumbnails?.large?.url}
                />
            </AspectRatio>

            <Stack direction="column" spacing={3} align="center">
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
                    &nbsp;
                    {product.fields.SKU}
                </Text>

                <Text noOfLines={2} lineHeight="short">
                    {product.fields.Description}
                </Text>

                <Text>
                    {formatCurrencyString({ value: product.fields.Price * 100, currency: currency })}
                </Text>

                <SignedIn>
                    <AddToCartButton product={product} />
                </SignedIn>

                <SignedOut>
                    <SignInButton text="Sign in to purchase!" />
                </SignedOut>
            </Stack>
        </Box>
    );
}

const AddToCartButton = ({ product }: ProductCardProps) => {
    const { addItem } = useShoppingCart();

    return (
        <Button mt="6" variant="outline" onClick={() => addItem(toStripeProduct(product))}>
            Add to cart
        </Button>
    );
}
