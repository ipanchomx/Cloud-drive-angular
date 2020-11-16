import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus:BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.loginStatus.next(this.isLoggedIn());
  }

  save(data) {
    this.loginStatus.next(true);
    localStorage.setItem('token', data.token);
  }

  get() {
    return localStorage.get('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  clear() {
    this.loginStatus.next(false);
    localStorage.removeItem('token');
  }
}