import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  isRememberMeActive() {
    return localStorage.length > 0 ? true : false;
  }

  getUid() {
    return this.isRememberMeActive() ? localStorage.getItem('uid') : '';
  }
}
