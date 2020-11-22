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
}
