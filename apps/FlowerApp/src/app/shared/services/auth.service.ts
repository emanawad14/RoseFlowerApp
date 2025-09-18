import { Injectable, signal, WritableSignal } from '@angular/core';
import { CookiesService } from '../../core/services/cookies.service';
import { UserDTO } from 'auth-api/src/lib/auth-api/interfaces/loginRes.dto';
import { TokenService } from '../../features/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userKey = 'user';
  // private userData?: UserDTO;
  userData : WritableSignal<UserDTO | null>=signal(null)

  constructor(
    private _CookiesService: CookiesService,
    private _TokenService: TokenService
  ) {
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

  getUser() : WritableSignal<UserDTO | null>{
    return this.userData;
  }

  clearUser() {
    this._TokenService.removeToken();
    this.userData.set(null);
    this._CookiesService.deleteCookie(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!this.userData(); // true if user data exists
  }
}
