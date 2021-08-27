import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Order } from '../Models/order';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  async placeOrder(order: Order) {
    let response = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return response;
  }

  getOrders(): Observable<Order[]> { 
    return this.db.list<Order>('/orders').valueChanges();
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    return this.db.list<Order>('/orders', ref => ref.orderByChild('uid').equalTo(userId)).valueChanges();
  }
}
