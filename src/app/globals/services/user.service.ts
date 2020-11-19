import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "./../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  getUsers(searchInput: string = '') {
    const url = `${environment.apiUrl}users?q=${searchInput}`;

    return this.httpClient.get(url);
  }
  
}
