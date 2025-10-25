import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookiesService } from './cookies.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 private _http = inject(HttpClient)
 _cookieService = inject(CookiesService);
    TOKEN_KEY: string = 'accessToken';
  getToken(): string {
   return this._cookieService.getCookie(this.TOKEN_KEY);
   }
 
  constructor() { }
  addProduct(productData: FormData):Observable<any> {
    return this._http.post(`https://flower.elevateegy.com/api/v1/products`, productData, {
      headers: {
        Authorization: this.getToken() ? `Bearer ${this.getToken()}` : '',
      }
    });
  }
  getproductById(productId:string):Observable<any>{
    return this._http.get(`https://flower.elevateegy.com/api/v1/products/${productId}`, {
      headers: {
        Authorization: this.getToken() ? `Bearer ${this.getToken()}` : '',
      }
    });
  }
}
