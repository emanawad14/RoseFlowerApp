import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatigoryResponse } from '../../../shared/category/category-i';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly http = inject(HttpClient);
  private baseUrl = 'https://flower.elevateegy.com/api/v1/categories';

  

  
  

  getAllCategory():Observable<CatigoryResponse>
  {
  return  this.http.get<CatigoryResponse>(this.baseUrl)
  }


  addCategory(formData: FormData) {
    return this.http.post(this.baseUrl, formData);
  }

  

}



