import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { getLoggedUserDataDTO, User } from '../types/userData.interface';
import { environment } from 'apps/FlowerApp/src/environments/environment';
import { Country } from 'apps/FlowerApp/src/app/shared/interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  static countries: Country[] = [
    {
      name: 'Egypt',
      code: 'EG',
      dial: '20',
      flag: 'https://flagcdn.com/w20/eg.png',
    },
    {
      name: 'Saudi Arabia',
      code: 'SA',
      dial: '966',
      flag: 'https://flagcdn.com/w20/sa.png',
    },
    {
      name: 'United States',
      code: 'US',
      dial: '1',
      flag: 'https://flagcdn.com/w20/us.png',
    },
  ];
  constructor(private _http: HttpClient) {}
  getLoggedUserData(): Observable<User> {
    const url = `${environment.baseUrl}/api/v1/auth/profile-data`;
    return this._http
      .get<getLoggedUserDataDTO>(url)
      .pipe(map((res) => res.user));
  }
  updateProfile(data: any): Observable<User> {
    const url = `${environment.baseUrl}/api/v1/auth/editProfile`;
    return this._http
      .put<getLoggedUserDataDTO>(url, data)
      .pipe(map((res) => res.user));
  }
  updateProfilePhoto(formData: FormData) {
    const url = `${environment.baseUrl}/api/v1/auth/upload-photo`;
    return this._http.put(url, formData);
  }
  deleteAccount() {
    const url = `${environment.baseUrl}/api/v1/auth/deleteMe`;
    return this._http.delete(url);
  }
  changePassword() {}
}
