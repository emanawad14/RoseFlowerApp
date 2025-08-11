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
    const localHost = 'http://localhost:4200';
    const url = `${this.url}/checkout?url=${localHost}`;
    return this._http.post<CreateCreditOrderResponseInterface>(url, orderRequest);
  }
}
