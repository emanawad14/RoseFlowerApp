import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address, AddressResponceInterface } from 'apps/FlowerApp/src/app/shared/interfaces/addressResponse.interface';
import { environment } from 'apps/FlowerApp/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  selectedAddress: Address | null = null;
  constructor(private _http: HttpClient) {}

  getUserAddresses(): Observable<AddressResponceInterface> {
    const url = `${environment.baseUrl}/api/v1/addresses`;
    return this._http.get<AddressResponceInterface>(url);
  }
}
