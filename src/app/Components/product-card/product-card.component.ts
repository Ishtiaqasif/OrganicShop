import { Component, Input, OnInit } from '@angular/core';
import { Product, ProductWithKey } from 'src/app/Models/product';
import { ShoppingCart } from 'src/app/Models/shopping-cart';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product: ProductWithKey | any;
  @Input('showActions') showActions: boolean | undefined;
  @Input('shoppingCart') shoppingCart: ShoppingCart | undefined;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity(): number {
    if (this.product && this.shoppingCart?.items) {
      return this.shoppingCart?.items[this.product?.key]?.quantity || 0;
    }
    return 0;
  }
}
