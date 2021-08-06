import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppUser } from 'src/app/Models/app-user';
import { ShoppingCart, ShoppingCartWithKey } from 'src/app/Models/shopping-cart';
import { ShoppingCartItem } from 'src/app/Models/ShoppingCartItem';
import { AuthService } from 'src/app/Services/auth.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit {
  public isCollapsed = true;
  appUser: AppUser | null = null;
  cart$: Observable<ShoppingCart|null> = new Observable<ShoppingCart>();

  constructor(
    private auth: AuthService,
    private router: Router,
    private cartService: ShoppingCartService
  ) {}
  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
    this.cart$ = (await this.cartService.getCart());
  }

  async logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
