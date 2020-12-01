import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "./../../../environments/environment"
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private httpClient: HttpClient, private _authService: AuthService) { }

  upload(data: any) {
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

  updateFile(data: any) {
    const url = `${environment.apiUrl}files/`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });
    return this.httpClient.put(url, data, {
      headers: httpHeaders
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

  getSharedContent(path: string) {
    const url = `${environment.apiUrl}files/sharedFiles?path=${path}`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });
    return this.httpClient.get(url, {
      headers: httpHeaders,
    }).toPromise();
  }

  getPendingContent(path: string) {
    const url = `${environment.apiUrl}files/pendingFiles?path=${path}`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });
    return this.httpClient.get(url, {
      headers: httpHeaders,
    }).toPromise();
  }

  existDirectory(path: string) {
    const url = `${environment.apiUrl}files/existDirectory?path=${path}`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });
    return this.httpClient.get(url, {
      headers: httpHeaders,
    }).toPromise();
  }

  getFile(id: string) {
    const url = `${environment.apiUrl}files/${id}`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });
    return this.httpClient.get(url, {
      headers: httpHeaders,
    }).toPromise();
  }

  downloadFile(id: string) {
    const url = `${environment.apiUrl}files/download/${id}`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });
    return this.httpClient.get(url, {
      headers: httpHeaders,
      responseType: 'blob'
    }).toPromise();
  }

  deleteFile(id: string): Observable<any> {
    const url = `${environment.apiUrl}files/deleteFile/${id}`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });
    return this.httpClient.delete(url, {
      headers: httpHeaders
    });
  }

  updateVerificationStatus(obj):Promise<any> {
    const url = `${environment.apiUrl}files/updateVerificationStatus`;
    return this.httpClient.post(url, obj).toPromise();
  }

  getVersions(id: string) {
    const url = `${environment.apiUrl}files/getVersions/${id}`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });
    return this.httpClient.get(url, {
      headers: httpHeaders
    }).toPromise();
  }
  
}
