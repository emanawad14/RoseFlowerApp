import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orderResponse } from '../../interfaces/orders/orders';
import { environment } from 'apps/FlowerApp/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  private readonly http=inject(HttpClient);

  getUserOrders():Observable<orderResponse>
  {
     return this.http.get<orderResponse>(`${environment.baseUrl}/api/v1/orders`);
  }
}
