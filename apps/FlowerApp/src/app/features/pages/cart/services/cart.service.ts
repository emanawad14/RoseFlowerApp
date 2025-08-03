import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/FlowerApp/src/environments/environment';
import { AddToCartRequestInterface } from '../interfaces/addToCarRequest.interface';
import { AddToCartResponseDTO } from '../interfaces/addToCartResponse.interface';
import {
  deleteCartResponseDTO,
  UpdateQuantityRequest,
} from '../interfaces/updateProductQuantity.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _http: HttpClient) {}
  url = `${environment.baseUrl}/api/v1/cart`;
  addProductToCart(
    data: AddToCartRequestInterface
  ): Observable<AddToCartResponseDTO> {
    return this._http.post<AddToCartResponseDTO>(this.url, data);
  }
  getLoggedUserCart() {
    return this._http.get<AddToCartResponseDTO>(this.url);
  }
  updateSpecificCartQuantity(data: UpdateQuantityRequest ) {
    const url = `${environment.baseUrl}/api/v1/cart/${data.product}`;
    return this._http.put<AddToCartResponseDTO>(url, {quantity:data.quantity});
  }
  deleteSpecificProduct(productId: string) {
    const url = `${environment.baseUrl}/api/v1/cart/${productId}`;
    return this._http.delete<AddToCartResponseDTO>(url);
  }

  deleteCart() {
    return this._http.delete<deleteCartResponseDTO>(this.url);
  }
}
