import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Products } from '../_model/masters/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudProductService {
  _baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }  

  getProducts() {
    return this.http.get<Products[]>(this._baseUrl + 'Product/GetProducts');
  }

  getAllActiveProducts() {
    return this.http.get<Products[]>(this._baseUrl + 'Product/GetAllActiveProducts');
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(this._baseUrl + 'Product/DeleteProduct?id=' + productId);
  }

  updateProduct(model: Products): Observable<any> {
    return this.http.put<any>(this._baseUrl + 'Product/UpdateProduct', model);
  }

  saveProduct(productName: string, description: string): Observable<any> {    
    debugger
    let model = { productName: productName, description: description }
    return this.http.post<any>(this._baseUrl + 'Product/AddProduct', model);
  }  
}
