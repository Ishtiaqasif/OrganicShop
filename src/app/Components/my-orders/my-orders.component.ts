
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from 'src/app/Models/order';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  //orders$: Observable<Order[]>;
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 

    //this.orders$ = authService.user$.pipe(switchMap((u:any) => orderService.getOrdersByUser(u.uid)));
  }
}
