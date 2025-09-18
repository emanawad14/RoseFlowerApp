import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/FlowerApp/src/environments/environment';
import { CreateOrderRequestInterface } from '../interfaces/createOrderRequest.interface';
import { CreateCreditOrderResponseInterface } from '../interfaces/createCreditOrderRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  url = `${environment.baseUrl}/api/v1/orders`;
  constructor(private _http: HttpClient) {}

  createCashOrder(orderRequest: CreateOrderRequestInterface) {
    return this._http.post(this.url, orderRequest);
  }

  createCreditOrder(orderRequest: CreateOrderRequestInterface) {
    const url = `${this.url}/checkout?url=${environment.APP_URL}`;
    return this._http.post<CreateCreditOrderResponseInterface>(
      url,
      orderRequest
    );
  }
}
