import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/FlowerApp/src/environments/environment';
import { Observable } from 'rxjs';
import { Occasion, OccasionResponseInterface } from '../interfaces/occasion';

@Injectable({
  providedIn: 'root',
})
export class OccasionService {
  constructor(private _http: HttpClient) {}
  getAllOccasions(): Observable<OccasionResponseInterface> {
    return this._http.get<OccasionResponseInterface>(
      `${environment.baseUrl}${environment.endpoints.getAllOccasions}`
    );
  }
}
