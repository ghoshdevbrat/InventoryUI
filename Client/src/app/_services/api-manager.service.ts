import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IApiManagerService } from './abstract/api-manager-iservice';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {
  private readonly _baseUrl: string;
  constructor(private http: HttpClient) { 
    this._baseUrl = environment.baseUrl;
  }

  getRequest(url: string) {
    return this.http.get(this._baseUrl + url);
  }
  getRequestDownloadFile(url: string) {
    return this.http.get(this._baseUrl + url, { responseType: 'blob' });
  }
  postRequest(url: string, model: any): Observable<any> {
    return this.http.post<any>(this._baseUrl + url, model);
  }
  postRequestDownloadFile(url: string, model: any): Observable<any> {
    return this.http.post<any>(this._baseUrl + url, model, { responseType: 'blob' as 'json' });
  }
}
