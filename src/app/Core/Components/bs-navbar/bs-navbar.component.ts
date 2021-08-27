import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/Shared/Models/app-user';
import { ShoppingCart } from 'src/app/Shared/Models/shopping-cart';

import { AuthService } from '../../../Shared/Services/auth.service';
import { ShoppingCartService } from '../../../Shared/Services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit {
  public isCollapsed = true;
  appUser: AppUser | null = null;
  cart$: Observable<ShoppingCart|null> = new Observable<ShoppingCart>();
  cart: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cartService: ShoppingCartService
  ) {}
  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
    (await this.cartService.getCart()).subscribe((cart) => {
      this.cart = cart
    });
  }

  async logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
