import { ShoppingCartItem } from "./ShoppingCartItem";

export interface ShoppingCart {
    createdOn: string;
    items: ShoppingCartItem[];
}

export interface ShoppingCartWithKey extends ShoppingCart {
    key: string;
}