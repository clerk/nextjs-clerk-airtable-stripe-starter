import { SimpleGrid, Text, Fade } from "@chakra-ui/react";
import { SkeletonGrid } from "./SkeletonGrid";
import { useProduct } from "../hooks/useProduct";
import { ProductCard } from "./ProductCard";

export function ProductList() {
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
      <SimpleGrid minChildWidth="250px" gap={8}>
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
