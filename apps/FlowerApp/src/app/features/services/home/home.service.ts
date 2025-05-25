import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItemsRespon } from '../../interfaces/i-items';
import { environment } from '../../../shared/environments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }
   private readonly http=inject(HttpClient)

 getHomeScreen(): Observable<IItemsRespon> {
  return this.http.get<IItemsRespon>(`${environment.baseUrl}/api/v1/best-seller`);
}

 
}
