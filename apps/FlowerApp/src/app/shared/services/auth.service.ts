import { Injectable } from '@angular/core';
import { UserDTO } from '../auth/interfaces/loginRes.dto';
import { CookiesService } from '../../core/services/cookies.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userKey = 'user';
  private userData?: UserDTO;

  constructor(private _CookiesService: CookiesService) {
    // Load user data from localStorage (if available) when app starts
    const loginUser = this._CookiesService.getCookie(this.userKey);
    if (loginUser) {
      this.userData = JSON.parse(loginUser);
    }
  }

  setUser(user: UserDTO) {
    this.userData = user;
    //localStorage.setItem('userData', JSON.stringify(data)); // persist after refresh
    this._CookiesService.setCookie(this.userKey, JSON.stringify(user));
  }

  getUser(): UserDTO|undefined {
    return this.userData;
  }

  clearUser() {
    this.userData=undefined;
    // localStorage.removeItem('userData');
    this._CookiesService.deleteCookie(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!this.userData; // true if user data exists
  }
}
