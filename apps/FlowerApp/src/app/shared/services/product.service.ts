import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse } from '../../features/interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  
  private readonly _httpClient = inject(HttpClient);
  // constructor() { }

  getAllProducts(): Observable<ProductResponse> {
    return this._httpClient.get<ProductResponse>(
      'https://flower.elevateegy.com/api/v1/products'
    );
  }
  getProductByCategoryId(id: string): Observable<ProductResponse> {
    return this._httpClient.get<ProductResponse>(
      `https://flower.elevateegy.com/api/v1/products?category=${id}`
    );
  }
}
