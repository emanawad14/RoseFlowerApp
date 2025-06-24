import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CountbycategoryResponse } from '../interfaces/countbycategory';

@Injectable({
  providedIn: 'root',
})
export class CountByCategoryService {
  constructor(private _http: HttpClient) {}
  getCountByCategory(): Observable<CountbycategoryResponse> {
    return this._http.get<CountbycategoryResponse>(
      `${environment.baseUrl}${environment.endpoints.countbycategory}`
    );
  }
}
