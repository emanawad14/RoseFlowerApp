import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Address,
  AddressResponceInterface,
} from 'apps/FlowerApp/src/app/shared/interfaces/addressResponse.interface';
import { environment } from 'apps/FlowerApp/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private _http: HttpClient) {}
  url = `${environment.baseUrl}/api/v1/addresses`;
  getUserAddresses(): Observable<AddressResponceInterface> {
    const url = `${environment.baseUrl}/api/v1/addresses`;
    return this._http.get<AddressResponceInterface>(url);
  }

  removeAddress(_id: string): Observable<AddressResponceInterface> {
    const url = `${environment.baseUrl}/api/v1/addresses/${_id}`;
    return this._http.delete<AddressResponceInterface>(url);
  }

  addAddress(address: Address): Observable<AddressResponceInterface> {
    return this._http.patch<AddressResponceInterface>(this.url, address);
  }

  editAddress(address: Address,_id:string): Observable<AddressResponceInterface> {
     const url = `${environment.baseUrl}/api/v1/addresses/${_id}`;
    return this._http.patch<AddressResponceInterface>(this.url, address);
  }
}
