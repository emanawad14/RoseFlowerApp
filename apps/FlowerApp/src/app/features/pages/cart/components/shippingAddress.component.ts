import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { PrimaryBtnComponent } from 'apps/FlowerApp/src/app/shared/components/ui/primary-btn.component';
import { StepperComponent } from 'apps/FlowerApp/src/app/shared/components/ui/stepper.component';
import {
  Address,
  AddressResponceInterface,
} from 'apps/FlowerApp/src/app/shared/interfaces/addressResponse.interface';
import { AddressService } from '../services/address.service';
import { Subject, takeUntil } from 'rxjs';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { AddressesComponent } from 'apps/FlowerApp/src/app/shared/components/ui/addresses.component';

@Component({
  selector: 'app-shipping-address',
  imports: [
    CommonModule,
    StepperModule,
    PrimaryBtnComponent,
    StepperComponent,
    AddressesComponent,
    ListboxModule,
    FormsModule,
  ],
  templateUrl: './shippingAddress.component.html',
  styleUrl: './shippingAddress.component.scss',
})
export class ShippingAddressComponent implements OnInit, OnDestroy {
  stepNumber: number = 1;
  addresses: Address[] = [];
  private destroy$ = new Subject<void>();
  selectedAddress: Address | null = null;
  constructor(private _AddressService: AddressService) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.getAddresses();
    this.selectedAddress = this._AddressService.selectedAddress;
  }
  getAddresses() {
    this._AddressService
      .getUserAddresses()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: AddressResponceInterface) => {
          this.addresses = res.addresses;
          //this.selectedAddress = this.addresses[1]; // Default active (Cairo)
        },
      });
  }
  changeAddress(address: Address) {
    //console.log('selectedAddress', address);
    this.selectedAddress = address;
    this._AddressService.selectedAddress = address;
  }
}
