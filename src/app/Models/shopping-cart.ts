import { ShoppingCartItem } from './ShoppingCartItem';

export class ShoppingCart {
  createdOn: string = '';
  items: ShoppingCartItem[] = [];
  
  constructor(public itemsMap: { [key: string]: ShoppingCartItem }) {
    for (const productKey in itemsMap) {
      let item = itemsMap[productKey];
      this.items.push(item);
    }
  }

  get cartItems(){
    return Object.values(this.items).filter(product => product.quantity > 0);
  }

  
  get grandTotalPrice(): number {
  
    return this.cartItems.reduce((a, cartItem) => a + (cartItem.product.price * cartItem.quantity), 0)

  }

  get totalItemsCount(): number {
    let count = 0;
    for (let productId in this.items) {
      count += this.items[productId]?.quantity ?? 0;
    }
    return count;
  }
}

export interface ShoppingCartWithKey extends ShoppingCart {
  key: string;
}
