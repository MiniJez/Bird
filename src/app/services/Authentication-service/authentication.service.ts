import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userId = '';

  constructor() { }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then((res) => {
        this.userId = res.user.uid;
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
   }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then((res) => {
          this.userId = res.user.uid;
          if (value.remember === true) {
            localStorage.setItem('uid', this.userId);
          }
          resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
        .then(() => {
          console.log('LOG Out');
          localStorage.clear();
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    });
  }

  isUserAuthenticate() {
    return this.userId === '' ? false : true;
  }

  setUid(uid) {
    this.userId = uid;
  }
}
