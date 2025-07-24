import { Injectable, signal } from '@angular/core';
 import { CookiesService } from '../../core/services/cookies.service';
import { UserDTO } from 'auth-api/src/lib/auth-api/interfaces/loginRes.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userKey = 'user';
  // private userData?: UserDTO;
  userData = signal<UserDTO | null>(null);

  constructor(private _CookiesService: CookiesService) {
    // Load user data from localStorage (if available) when app starts
    const loginUser = this._CookiesService.getCookie(this.userKey);
    if (loginUser) {
      this.userData.set(JSON.parse(loginUser));
    }
  }

  setUser(user: UserDTO) {
    this.userData.set(user);
    //localStorage.setItem('userData', JSON.stringify(data)); // persist after refresh
    this._CookiesService.setCookie(this.userKey, JSON.stringify(user));
  }

  getUser() {
    return this.userData();
  }

  clearUser() {
    this.userData.set(null);
    // localStorage.removeItem('userData');
    this._CookiesService.deleteCookie(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!this.userData(); // true if user data exists
  }
}
