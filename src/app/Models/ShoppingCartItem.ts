import { ProductWithKey } from "./product";

export class ShoppingCartItem {
    product: ProductWithKey;
    quantity: number;

    constructor(product: ProductWithKey, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}