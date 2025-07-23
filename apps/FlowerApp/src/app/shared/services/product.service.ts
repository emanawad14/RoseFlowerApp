import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse } from '../../features/interfaces/products';
import { environment } from '../environments/enviroment';
import { ProductDetailEndpoints } from '../../features/pages/product-details/enum/product-detail.endpoints';
import {
  ProductDetailsDTO,
  RelatedProductsDTO,
} from '../../features/pages/product-details/interfaces/product.interface';

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

  getProductById(_id: string): Observable<ProductDetailsDTO> {
    return this._httpClient.get<ProductDetailsDTO>(
      `${environment.baseUrl}${ProductDetailEndpoints.GET_PRODUCT_BY_ID}/${_id}`
    );
  }

  getRelatedProductsById(_id: string): Observable<RelatedProductsDTO> {
    return this._httpClient.get<RelatedProductsDTO>(
      `${environment.baseUrl}${ProductDetailEndpoints.GET_RELATED_PRODUCTS_BY_ID}/${_id}`
    );
  }
}
