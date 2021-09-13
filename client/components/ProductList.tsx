import {
    SimpleGrid,
    Text,
    Fade,
} from "@chakra-ui/react";

import { SkeletonGrid } from "./SkeletonGrid";
import { useProduct } from "../hooks/useProduct";
import { ProductCard } from "./ProductCard";

export default function ProductList() {
    const {
        products,
        productRetrievalError,
        areProductsLoading,
    } = useProduct();

    if (productRetrievalError) {
        return <ErrorMessage />;
    }

    if (areProductsLoading) {
        return <SkeletonGrid />;
    }

    return (
        <Fade transition={{ enter: { duration: 1 } }} in={!areProductsLoading}>
            <SimpleGrid columns={[2, null, 3]} spacing={5}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </SimpleGrid>
        </Fade>
    );
}

const ErrorMessage = () => (
    <Text color="red">
        Sorry, something went wrong! Please check your setup 💀
    </Text>
);
