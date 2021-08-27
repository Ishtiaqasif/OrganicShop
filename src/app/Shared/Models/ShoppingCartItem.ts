import { ProductWithKey } from "./product";

export class ShoppingCartItem {
    product: ProductWithKey;
    quantity: number;
    get totalPrice():number {
        return this.product.price * this.quantity;
    }
    constructor(product: ProductWithKey, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}