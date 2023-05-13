import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Querydto } from '../_models/querydto';
import { States } from '../_models/states';
import { QueryModel } from '../_models/_admin/query-registration';
import { ApiManagerService } from './api-manager.service';
import { User } from '../_model/user';
import { UserStatus } from '../_model/admin/user-status';
import { Observable } from 'rxjs';
import { AppRoles } from '../_model/admin/app-roles';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly _baseUrl: string;

  constructor(private apiManager: ApiManagerService, private http: HttpClient) {
    this._baseUrl = environment.baseUrl;
  }
  getQueries() {
    return this.http.get<Querydto[]>(this._baseUrl + 'admin/get-queries?pageNumber=1&pageSize=100');
  }

  getStates() {
    return this.http.get<States[]>(this._baseUrl + 'Common/GetStates');
  }

  getCities() {
    return this.http.get<States[]>(this._baseUrl + 'Common/GetCities');
  }

  getCityByStateId(stateId: number) {
    return this.http.get<States>(this._baseUrl + 'Common/GetCitiesByStateId?stateId=' + stateId);
  }

  register(model: any) {
    console.log(model);
    console.log(this._baseUrl);
    return this.http.post(this._baseUrl + 'account/register', model);
  }

  delteQuery(model: Querydto) {
    return this.http.post(this._baseUrl + 'admin/update-query', model);
  }

  getUsers() {
    return this.http.get<User[]>(`${this._baseUrl}account/getUsers`);
  }

  getUserStatus(): Observable<UserStatus[]> {
    return this.http.get<UserStatus[]>(`${this._baseUrl}account/getUserStatus`);
  }

  getRoles(): Observable<AppRoles[]> {
    return this.http.get<AppRoles[]>(`${this._baseUrl}account/getRoles`);
  }

  addBulkUsers(model:any): Observable<any> {
    return this.http.post<any>(`${this._baseUrl}Account/bulkRegister`, model);
  }
}
