import { Component, Input, OnInit } from '@angular/core';
import { Product, ProductWithKey } from 'src/app/Shared/Models/product';
import { ShoppingCart } from 'src/app/Shared/Models/shopping-cart';
import { ShoppingCartService } from '../../../Shared/Services/shopping-cart.service';

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
}
