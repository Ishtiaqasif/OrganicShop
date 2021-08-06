import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product, ProductWithKey } from '../Models/product';
import { ShoppingCart, ShoppingCartWithKey } from '../Models/shopping-cart';
import { ShoppingCartItem } from '../Models/ShoppingCartItem';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private createCart() {
    let cart: ShoppingCart = {
      createdOn: new Date().toString(),
      items: [],
      totalItemsCount: 0,
    };
    return this.db.list<ShoppingCart>('/shopping-carts').push(cart);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object<ShoppingCart>(`/shopping-carts/${cartId}`).valueChanges().pipe(map((cart:ShoppingCart|null) => new ShoppingCart(<any>cart?.items)));
  }

  getItem(
    cartId: string,
    productKey: string
  ): AngularFireObject<ShoppingCartItem> {
    return this.db.object(`/shopping-carts/${cartId}/items/${productKey}`);
  }
  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let cart: any = await this.createCart();
    localStorage.setItem('cartId', cart.key);

    return cart.key;
  }

  async addToCart(product: ProductWithKey) {
    this.updateQuantityToCart(product, 1);
  }

  async removeFromCart(product: ProductWithKey) {
    this.updateQuantityToCart(product, -1);
  }

  private async updateQuantityToCart(product: ProductWithKey, change: number) {
    let cartId = await this.getOrCreateCartId();

    let cartItemRef = this.getItem(cartId, product.key);

    let item$: Observable<ShoppingCartItem | null> = cartItemRef.valueChanges();

    item$.pipe(take(1)).subscribe((item: any) =>
      cartItemRef.update({
        product: product,
        quantity: (item?.quantity || 0) + change,
      })
    );
  }
}
