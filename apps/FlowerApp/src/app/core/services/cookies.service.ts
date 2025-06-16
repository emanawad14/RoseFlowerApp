import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor(private _cookieService: CookieService) {}

  saveToCookies(key: string, value: string) {
    this._cookieService.set(key, value);
    console.log('saved to cookies');
    
  }
  getFromCookies(key: string ): string | null {
    return this._cookieService.get(key);
  }
  clearFromCookies(key: string): void {
    this._cookieService.delete(key);
  }
}
