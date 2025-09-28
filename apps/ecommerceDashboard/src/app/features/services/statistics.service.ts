import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookiesService } from './cookies.service';
import { dashboardStatisticsResponse, Statistics } from '../../core/modals/statistics';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

 private readonly httpClient = inject(HttpClient);
  _cookieService = inject(CookiesService);
   TOKEN_KEY: string = 'accessToken';
 getToken(): string {
  return this._cookieService.getCookie(this.TOKEN_KEY);
  }
  constructor() { }
  getStatistics(): Observable<dashboardStatisticsResponse> {
    return this.httpClient.get<dashboardStatisticsResponse>('https://flower.elevateegy.com/api/v1/statistics',
      {
   headers: {
      Authorization: this.getToken() ? `Bearer ${this.getToken()}` : '',
    },
  }
    );
  }
    }
