import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatigoryResponse } from '../interfaces/catigory.FlowerApp';
import { baseUrl } from '../../core/environments/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class CatigoryService {
  private readonly _httpClient = inject(HttpClient);

  getCatigory(): Observable<CatigoryResponse> {
    return this._httpClient.get<CatigoryResponse>(
      baseUrl.basUrl + 'categories?limit=5'
    );
  }
}
