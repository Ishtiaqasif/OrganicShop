import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from '../Models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User|null>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = afAuth.authState;
    //this.appUser$ = this.userService.get()
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider);
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser| null> {
    return this.user$
     .pipe(switchMap(user => this.userService.get(user?.uid)))
  }
}
