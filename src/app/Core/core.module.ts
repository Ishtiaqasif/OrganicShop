import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsNavbarComponent } from './Components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    BsNavbarComponent, HomeComponent, LoginComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ]),
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
