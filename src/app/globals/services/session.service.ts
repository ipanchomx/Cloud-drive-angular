import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from "./../../../environments/environment"
import { env } from 'process';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private httpClient:HttpClient, private authService:AuthService) { }

  signup(data:any):Promise<any> {
    const url = `${environment.apiUrl}users/register`;
    return this.httpClient.post(url, data).toPromise();
  }

  login(credentials:any):Promise<any> {
    const url = `${environment.apiUrl}users/login`;
    return this.httpClient.post(url, credentials).toPromise();
  }

  googleLogin(id:string):Promise<any> {
    const url = `${environment.apiUrl}users/login/google`;
    return this.httpClient.post(url, {id}).toPromise(); 
  }

  changePassword(obj):Promise<any> {
    const url = `${environment.apiUrl}users/changePassword`;
    return this.httpClient.post(url, obj).toPromise();
  }

  changeName(newName):Promise<any>{
    const url = `${environment.apiUrl}users/changeName`
    const httpHeaders = new HttpHeaders({
      Authorization: this.authService.get()
    });
    return this.httpClient.post(url, {newName: newName}, {
      headers: httpHeaders,
      reportProgress: true,
      observe: 'events'
    }).toPromise();
  }

  getUserInfo(id:string):Promise<any> {
    const url = `${environment.apiUrl}users/getUser`;
    return this.httpClient.post(url, {id}).toPromise();
  }
}