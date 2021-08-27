import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/Models/order';
import { ShippingDetails } from 'src/app/Models/shipping-details';
import { ShoppingCart } from 'src/app/Models/shopping-cart';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping: ShippingDetails = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };
  userSubscription: Subscription | undefined;
  user: any |undefined;
  constructor(private authService: AuthService, private router: Router, private orderService: OrderService ) {
    this.cart = new ShoppingCart({});
  }
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.user = user;
    })
  }

  async placeOrder() {
    let user: User = {
      userId: this.user.uid,
      email: this.user.email,
      name: this.user.displayName,
    };

    let order = new Order(user, this.shipping, this.cart);

    let response: any = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', response.key]);
  }
}
