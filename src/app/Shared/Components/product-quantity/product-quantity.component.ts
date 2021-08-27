import { Component, Input } from '@angular/core';
import { ProductWithKey } from 'src/app/Shared/Models/product';
import { ShoppingCart } from 'src/app/Shared/Models/shopping-cart';
import { ShoppingCartService } from '../../../Shared/Services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: ProductWithKey | any;
  @Input('shopping-cart') shoppingCart: ShoppingCart | undefined;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  
}
