import { ProductWithKey } from "./product";

export interface ShoppingCartItem {
    product: ProductWithKey;
    quantity: number;
}