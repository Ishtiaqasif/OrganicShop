import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/Models/shopping-cart';
import { ShoppingCartItem } from 'src/app/Models/ShoppingCartItem';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$: Observable<ShoppingCart> = new Observable<ShoppingCart>();

  constructor(private cartService: ShoppingCartService ) {}
  async ngOnInit(): Promise<void> {
    this.cart$ = await this.cartService.getCart();
  }

  async clearCart() {
    await this.cartService.clearCart();
  }

}
