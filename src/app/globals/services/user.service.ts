import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from "./../../../environments/environment"
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient, private _authService: AuthService) { }

  getUsers(searchInput: string = '') {
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });

    const url = `${environment.apiUrl}users?q=${searchInput}`;

    return this.httpClient.get(url, {
      headers: httpHeaders
    });
  }

  changePhoto(data: any) {
    const url = `${environment.apiUrl}users/updateImage`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });
    return this.httpClient.put(url, data, {
      headers: httpHeaders
    });
  }

  getNotifications() {
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });

    const url = `${environment.apiUrl}users/notifications`;

    return this.httpClient.get(url, {
      headers: httpHeaders
    });
  }

  deleteNotification(id: string) {
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });

    const url = `${environment.apiUrl}users/notifications/${id}`;

    return this.httpClient.delete(url, {
      headers: httpHeaders
    });
  }

  deleteAllNotifications() {
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });

    const url = `${environment.apiUrl}users/notifications`;

    return this.httpClient.delete(url, {
      headers: httpHeaders
    });
  }

  deleteUser() {
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });

    const url = `${environment.apiUrl}users/`;

    return this.httpClient.delete(url, {
      headers: httpHeaders
    });
  }

}
