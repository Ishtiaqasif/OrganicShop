import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUser } from '../Models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { 

  }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    }).then((x) => {
      console.log('User saved!');
    }).catch(err => {
      console.log('Error saving user: ', err);
    });
  }

  get(uid: string| undefined): Observable<AppUser|null> {
    
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }
}
