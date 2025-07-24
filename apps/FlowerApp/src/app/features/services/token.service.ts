import { Injectable } from '@angular/core';
import { CookiesService } from '../../core/services/cookies.service';
import { TokenInterface } from '../interfaces/tokenInterface';

@Injectable({
  providedIn: 'root',
})
export class TokenService implements TokenInterface {
  constructor(private _cookieService: CookiesService) {}
  TOKEN_KEY: string = 'accessToken';
  setToken(token: string): void {
    this._cookieService.setCookie(this.TOKEN_KEY, token);
    // console.log(token);

    //  console.log('Token saved');
  }
  getToken(): string {
    return this._cookieService.getCookie(this.TOKEN_KEY);
  }
  removeToken(): void {
    this._cookieService.deleteCookie(this.TOKEN_KEY);
  }
}
