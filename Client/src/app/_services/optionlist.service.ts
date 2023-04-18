import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiManagerService } from './api-manager.service';
import { options } from '../_models/options';
import { optionswithkeyasnumber } from '../_models/optionswithkeyasnumber';
import { Options } from 'highcharts';

 

@Injectable({
  providedIn: 'root'
})
export class OptionlistService {
  private readonly _baseUrl: string;
  constructor(private apiManager: ApiManagerService, private http: HttpClient) {
    this._baseUrl = environment.baseUrl;
  }

  getStateOptions() {
    return this.http.get<Options[]>(this._baseUrl + 'Optionlist/GetStateOptions');
  }

  getCityOptionsByStateId(stateId:number) {
    return this.http.get<optionswithkeyasnumber[]>(`${this._baseUrl}Optionlist/GetCityOptionsByStateId?stateId={stateId}`);
  }




}
