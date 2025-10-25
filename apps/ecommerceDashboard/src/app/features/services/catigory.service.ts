import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
  
@Injectable({
  providedIn: 'root',
})
export class CatigoryService {
  private readonly _httpClient = inject(HttpClient);

  getCatigory(): Observable<any> {
    return this._httpClient.get<any>(
      "https://flower.elevateegy.com/api/v1/occasions"
    );
  }
}
