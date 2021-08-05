import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/Models/app-user';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
public isCollapsed = true;
  appUser: AppUser|null = null;
  constructor(private auth: AuthService, private router: Router) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
   }

  async logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
