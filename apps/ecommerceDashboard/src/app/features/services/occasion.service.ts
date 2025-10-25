import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/FlowerApp/src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
 

@Injectable({
  providedIn: 'root',
})
export class OccasionService  {
  constructor(
    private _http: HttpClient,
   ) {}
  getAllOccasions(): Observable<any> {
    return this._http
      .get<any>(
        `https://flower.elevateegy.com/api/v1/categories`
      )
       
  }
}
