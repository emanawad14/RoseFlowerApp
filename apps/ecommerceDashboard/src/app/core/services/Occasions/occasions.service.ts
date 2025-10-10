import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OccasionResponse } from '../../../shared/Occasion/occasion';

@Injectable({
  providedIn: 'root'
})
export class OccasionsService {

  constructor() { }
  private readonly http=inject(HttpClient);
  private baseUrl = 'https://flower.elevateegy.com/api/v1/occasions';

  


  getAllOccasions():Observable<OccasionResponse>
  {
    return this.http.get<OccasionResponse>(this.baseUrl)
  }

   addOccasion(formData: FormData) {
    return this.http.post(this.baseUrl, formData);
  }

  
}
