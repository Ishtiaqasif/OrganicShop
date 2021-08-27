
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Order } from 'src/app/Shared/Models/order';
import { AuthService } from '../../../Shared/Services/auth.service';
import { OrderService } from '../../../Shared/Services/order.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$:Observable<Order[]>;
  customer: string = 'My';
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 

    this.orders$ = authService.user$.pipe(switchMap((u:any) => orderService.getOrdersByUser(u.uid)));
  }
}
