import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/FlowerApp/src/environments/environment';
import { map, Observable } from 'rxjs';
import { Occasion, OccasionResponseInterface } from '../interfaces/occasion';
import { OccasionApiInterface } from './base/occasionAPI';
import { CheckboxOption } from '../interfaces/checbox-options';
import { OccasionAdapter } from './adapter/occasion-adapter.adapter';

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
        `${environment.baseUrl}${environment.endpoints.getAllOccasions}`
      )
      .pipe(map((res) => this._OccasionAdapter.adapt(res)));
  }
}
