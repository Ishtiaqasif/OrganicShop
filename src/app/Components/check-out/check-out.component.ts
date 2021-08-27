import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  ShoppingCart,
} from 'src/app/Models/shopping-cart';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  
  cart: ShoppingCart;
  cartSubscription: Subscription | undefined;
  

  constructor(private cartService: ShoppingCartService) {
    this.cart = new ShoppingCart({});
  }
  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    let cart$: Observable<ShoppingCart> = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe((cart) => {
      this.cart = cart;
    });
  }

  
}
