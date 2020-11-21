import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "./../../../environments/environment"
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private httpClient:HttpClient, private _authService: AuthService) { }

  upload(data: any){
    const url = `${environment.apiUrl}files/`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });
    return this.httpClient.post(url, data, {
      headers: httpHeaders,
      reportProgress: true,
      observe: 'events'
    });
  }

  createFolder(data: any) {
    const url = `${environment.apiUrl}files/directory`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });
    return this.httpClient.post(url, data, {
      headers: httpHeaders,
    }).toPromise();
  }


  getPathContent(path: string) {
    const url = `${environment.apiUrl}files?path=${path}`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });
    return this.httpClient.get(url, {
      headers: httpHeaders,
    }).toPromise();
  }


}
