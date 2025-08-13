import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Address } from '../../interfaces/addressResponse.interface';
import { AddressService } from '../../../features/pages/cart/services/address.service';
import { Store } from '@ngrx/store';
import { addressActions } from '../../../features/pages/address/store/actions';
import {
  selectAddressesData,
  selectError,
  selectIsLoading,
} from '../../../features/pages/address/store/reducers';
import { combineLatest, Observable } from 'rxjs';
import { AddressStateInterface } from '../../../features/pages/address/types/addressState.interface';
import { LoadingComponent } from './loading.component';

@Component({
  selector: 'app-addresses',
  imports: [CommonModule, LoadingComponent],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss',
})
export class AddressesComponent implements OnInit {
  data$!: Observable<AddressStateInterface>;
  // addresses$?: Observable<Address[] | null | undefined>;
  constructor(public _AddressService: AddressService, private store: Store) {}
  ngOnInit(): void {
    //   this.addresses$ = this.store.select(selectAddressesData);
    this.data$ = combineLatest({
      data: this.store.select(selectAddressesData),
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
    });
    this.store.dispatch(addressActions.getLoggedUserAddress());
  }

  selectAddress(address: Address) {
    //  console.log(address);
    this._AddressService.selectedAddress.set(address as Address);
  }
}
