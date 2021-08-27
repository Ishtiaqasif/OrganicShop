import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Shared/Services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth: AuthService) { }


  async login(){
    this.auth.login();
  }

  
}
