import { Product as StripeProduct } from "use-shopping-cart";
import { ProductRecord } from "../types";
import { formatAmountForStripe } from "./stripe-helpers";

const currency = process.env.NEXT_PUBLIC_CURRENCY!;

export function toStripeProduct(product: ProductRecord): StripeProduct {
  return {
    id: product.id,
    name: product.fields.Name,
    price: formatAmountForStripe(product.fields.Price, currency),
    currency: process.env.NEXT_PUBLIC_CURRENCY!,
  };
}
