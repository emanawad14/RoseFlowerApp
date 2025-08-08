import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  private readonly http=inject(HttpClient);

  getUserOrders():Observable<any>
  {
     return this.http.get(`https://flower.elevateegy.com/api/v1/orders`);
  }
}
