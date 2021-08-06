import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/Models/app-user';
import { ShoppingCart } from 'src/app/Models/shopping-cart';
import { ShoppingCartItem } from 'src/app/Models/ShoppingCartItem';
import { AuthService } from 'src/app/Services/auth.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
public isCollapsed = true;
  appUser: AppUser|null = null;
  shoppingCartItemCount: number = 0;

  constructor(private auth: AuthService, private router: Router, private cartService: ShoppingCartService) {
    
   }
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    let shoppingCartRef = (await this.cartService.getCart());
    
    shoppingCartRef.valueChanges().subscribe(
      (cart: ShoppingCart | any) => {
        this.shoppingCartItemCount = 0;
        for (let productId in cart?.items) {
          this.shoppingCartItemCount += cart.items[productId]?.quantity ?? 0;
        }
        }
    );


  }

  async logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
