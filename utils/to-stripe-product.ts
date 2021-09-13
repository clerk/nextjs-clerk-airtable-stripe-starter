import {Product as StripeProduct} from "use-shopping-cart";
import {ProductRecord} from "../types";

export function toStripeProduct(product: ProductRecord): StripeProduct {
    return {
        id: product.id,
        name: product.fields.Name,
        price: product.fields.Price * 100, // in cents
        currency: process.env.NEXT_PUBLIC_CURRENCY!,
    };
}
