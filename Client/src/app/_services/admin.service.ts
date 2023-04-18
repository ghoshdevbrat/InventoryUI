import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Querydto } from '../_models/querydto';
import { States } from '../_models/states';
import { QueryModel } from '../_models/_admin/query-registration';
import { ApiManagerService } from './api-manager.service';

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



  register(model: any) {
    console.log(model);
    console.log(this._baseUrl);
    return this.http.post(this._baseUrl + 'account/register', model);
  }

  delteQuery(model: Querydto) {
    return this.http.post(this._baseUrl + 'admin/update-query', model);
  }

  getAvailableBalance(agentId: string) {
    return this.http.get(this._baseUrl + 'admin/get-available-balance?agentId=' + agentId);
  }

  
}
