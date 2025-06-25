import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { CountbycategoryResponse } from '../interfaces/countbycategory';
import { CountByCategoryApiInterface } from './base/count-by-categoryAPI';
import { CountbycategoryAdapter } from './adapter/count-by-category.adapter';
import { CheckboxOption } from '../interfaces/checbox-options';
import { FiltersAPIEEndpoints } from './enums/filters.api.endpoints';

@Injectable({
  providedIn: 'root',
})
export class CountByCategoryService implements CountByCategoryApiInterface {
  constructor(
    private _http: HttpClient,
    private _CountbycategoryAdapter: CountbycategoryAdapter
  ) {}
  getCountByCategory(): Observable<CheckboxOption[]> {
    return this._http
      .get<CountbycategoryResponse>(
        `${environment.baseUrl}${FiltersAPIEEndpoints.GET_COUNT_BY_CATEGORY}`
      )
      .pipe(
        map((res: CountbycategoryResponse) =>
          this._CountbycategoryAdapter.adapt(res)
        )
      );
  }
}
