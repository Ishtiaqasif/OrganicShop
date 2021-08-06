import { ShoppingCartItem } from './ShoppingCartItem';

export class ShoppingCart {
  createdOn: string = '';
  
  constructor(public items: ShoppingCartItem[]) {

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
