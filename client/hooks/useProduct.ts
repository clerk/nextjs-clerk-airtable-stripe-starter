import { useEffect, useState } from "react";
import type { ProductRecord } from "../../types";

export function useProduct() {
  const [areProductsLoading, setAreProductsLoading] = useState(false);
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [productRetrievalError, setProductsRetrievalError] = useState(null);

  useEffect(() => {
    const retrieveProducts = async function () {
      setAreProductsLoading(true);

      try {
        const products = (await (
          await fetch(`/api/products`)
        ).json()) as ProductRecord[];
        setProducts(products);
      } catch (err) {
        setProductsRetrievalError(err);
      } finally {
        setAreProductsLoading(false);
      }
    };

    retrieveProducts();
  }, []);
  
  return {
    areProductsLoading,
    products,
    productRetrievalError,
  };
}
