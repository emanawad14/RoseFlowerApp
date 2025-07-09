import { FiltersAPIEEndpoints } from './enums/filters.api.endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/FlowerApp/src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { OccasionResponseInterface } from '../interfaces/occasion';
import { OccasionApiInterface } from './base/occasionAPI';
import { CheckboxOption } from '../interfaces/checbox-options';
import { OccasionAdapter } from './adapter/occasion-adapter.adapter';
import { ErrorResponseDTO } from '../interfaces/error';

@Injectable({
  providedIn: 'root',
})
export class OccasionService implements OccasionApiInterface {
  constructor(
    private _http: HttpClient,
    private _OccasionAdapter: OccasionAdapter
  ) {}
  getAllOccasions(): Observable<CheckboxOption[]> {
    return this._http
      .get<OccasionResponseInterface>(
        `${environment.baseUrl}${FiltersAPIEEndpoints.GET_ALL_OCCASIONS}`
      )
      .pipe(
        map((res) => this._OccasionAdapter.adapt(res)),
        catchError((err: ErrorResponseDTO) => throwError(() => err))
      );
  }
}
