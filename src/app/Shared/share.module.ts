import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './Components/product-card/product-card.component';
import { ProductQuantityComponent } from './Components/product-quantity/product-quantity.component';
import { AuthGuard } from './Services/auth-guard.service';
import { AuthService } from './Services/auth.service';
import { CategoryService } from './Services/category.service';
import { OrderService } from './Services/order.service';
import { ProductService } from './Services/product.service';
import { ShoppingCartService } from './Services/shopping-cart.service';
import { UserService } from './Services/user.service';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [
    
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  exports:[
    ProductCardComponent,
    ProductQuantityComponent,
  ]
})
export class ShareModule { }
