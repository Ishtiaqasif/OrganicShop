import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../Shared/Services/auth-guard.service';
import { ShareModule } from '../Shared/share.module';

import { CheckOutComponent } from './Components/check-out/check-out.component';
import { MyOrdersComponent } from './Components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './Components/order-success/order-success.component';
import { ProductFilterComponent } from './Components/product-filter/product-filter.component';
import { ProductsComponent } from './Components/products/products.component';
import { ShippingFormComponent } from './Components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './Components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';



@NgModule({
  declarations: [
    CheckOutComponent,
    ProductsComponent,
    ShoppingCartComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    FormsModule,
    ShareModule,
    CommonModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },

      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order-success/:key',
        component: OrderSuccessComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'my/orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuard],
      }
    ]),
  ]
})
export class ShoppingModule { }
