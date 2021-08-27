import { OrderItem } from "./order-item";
import { Product } from "./product";
import { ShippingDetails } from "./shipping-details";
import { ShoppingCart } from "./shopping-cart";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { User } from "./user";

export class Order {
    datePlaced: Date;
    items: OrderItem[];

    constructor(public user: User,public shippingDetails: ShippingDetails, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date();
        this.items = shoppingCart.cartItems.map((item: ShoppingCartItem) => {
            
            let product: Product = {
                title: item.product.title,
                price: item.product.price,
                category: item.product.category,
                imageUrl: item.product.imageUrl
            }

            let orderItem: OrderItem = {
                product: product,
                quantity: item.quantity,
                totalPrice: item.totalPrice,
            }

            return orderItem;
        })
    }
}
    