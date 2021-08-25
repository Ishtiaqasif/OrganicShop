import { ProductWithKey } from './product';
import { ShoppingCartItem } from './ShoppingCartItem';

export class ShoppingCart {
  createdOn: string = '';
  items: ShoppingCartItem[] = [];
  
  constructor(private itemsMap: { [key: string]: ShoppingCartItem }) {
    itemsMap = itemsMap || {};
    for (const productKey in itemsMap) {
      let item = itemsMap[productKey];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
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

  getQuantity(product: ProductWithKey): number {
    if(!this.itemsMap) return 0;
      let item =  this.itemsMap[product.key];
      return item? item.quantity: 0;
  }
}

export interface ShoppingCartWithKey extends ShoppingCart {
  key: string;
}
