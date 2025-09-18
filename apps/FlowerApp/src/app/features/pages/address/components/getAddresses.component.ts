import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Address } from 'apps/FlowerApp/src/app/shared/interfaces/addressResponse.interface';
import { PrimaryBtnComponent } from 'apps/FlowerApp/src/app/shared/components/ui/primary-btn.component';
import { Store } from '@ngrx/store';
import { addressActions } from '../store/actions';
import { combineLatest, delay, Observable } from 'rxjs';
import { AddressStateInterface } from '../types/addressState.interface';
import {
  selectAddressesData,
  selectError,
  selectIsLoading,
} from '../store/reducers';
import { LoadingComponent } from 'apps/FlowerApp/src/app/shared/components/ui/loading.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogComponent } from 'apps/FlowerApp/src/app/shared/components/ui/confirmDialog.component';
 import { DialogViewEnum } from '../types/viewDialogType.enum';

@Component({
  selector: 'app-get-addresses',
  imports: [
    CommonModule,
    PrimaryBtnComponent,
    LoadingComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './getAddresses.component.html',
  styleUrl: './getAddresses.component.scss',
  providers: [DialogService],
})
export class GetAddressesComponent implements OnInit {
  @ViewChild(ConfirmDialogComponent) confirmDialog!: ConfirmDialogComponent;
  // addresses: Address[] = [];
  data$!: Observable<AddressStateInterface>;
  constructor(
    private store: Store,
   ) {}
  ngOnInit(): void {
    this.data$ = combineLatest({
      data: this.store.select(selectAddressesData),
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
    }).pipe(delay(0));
    this.getAddressess();
  }

  getAddressess() {
    this.store.dispatch(addressActions.getLoggedUserAddress());
    // this._addressService.getUserAddresses().subscribe({
    //   next: (res) => (this.addresses = res.addresses),
    // });
  }

  deleteAddress(address: Address) {
    this.confirmDialog.confirmDialog(`Will remove ${address.city}`, () => {
      // confirmed: handle deletion logic
      this.store.dispatch(
        addressActions.deleteAddress({ addressId: address._id })
      );

      // this._MessageService.add({
      //   severity: 'success',
      //   summary: 'Confirmed',
      //   detail: 'Cart deleted',
      // });
    });
  }

  displayAddAddressForm() {
    console.log('add address');
    this.store.dispatch(
      addressActions.openDialogComponent({ view: DialogViewEnum.addAddress })
    );
    /// this._dialogContent.selectedComponentView.set(AddAddressComponent);
  }
}
