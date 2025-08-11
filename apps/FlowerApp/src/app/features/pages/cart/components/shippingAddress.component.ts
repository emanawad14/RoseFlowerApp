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
import { PaymentMethod } from '../interfaces/paymentMethod.interface';
import { OrdersService } from '../services/orders.service';
import { ToastService } from 'apps/FlowerApp/src/app/shared/services/toast.service';
import { Router } from '@angular/router';
import { ShippingAddress } from '../interfaces/createOrderRequest.interface';

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
  selectedPayment: PaymentMethod | null = null;
  paymentMethods: PaymentMethod[] = [
    {
      _id: '1',
      imgSrc: '/images/cash.png',
      title: 'Cash on Delivery',
      description: 'You’ll pay in cash when your order is delivered.',
    },
    {
      _id: '2',
      imgSrc: '/images/credit.png',
      title: 'Credit Card',
      description:
        'You’ll be securely redirected to Stripe to complete your payment.',
    },
  ];

  loading = false;
  constructor(
    private _AddressService: AddressService,
    private _OrdersService: OrdersService,
    private _toastService: ToastService,
    private _router: Router
  ) {}
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
  setPaymentMethod(paymentMethod: PaymentMethod) {
    this.selectedPayment = paymentMethod;
  }
  checkout() {
    this.loading = true;
    const shippingAddress = this.omit(this.selectedAddress as Address, [
      'username',
      '_id',
    ]);

    if (!this.selectedAddress || !this.selectedPayment) {
      this._toastService.showInfo(
        'You should select Address and Payment Method'
      );
      this.loading = false;
    }

    //cash
    else if (this.selectedPayment?._id == '1') {
      this._OrdersService
        .createCashOrder({
          shippingAddress: shippingAddress as ShippingAddress,
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.loading = false;
            console.log(res);
            this._toastService.showSuccess('order has been done');
            this._router.navigate(['/myOrders']);
          },
          error: (err) => {
            this.loading = false;
            // console.log(err);
            this._toastService.showError(err.error.error);
          },
        });
    }
    //credit
    else if (this.selectedPayment?._id == '2') {
      this._OrdersService
        .createCreditOrder({
          shippingAddress: shippingAddress as ShippingAddress,
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.loading = false;
            console.log(res);
            window.open(res.session.url, '_self');
            //this._toastService.showSuccess('order has been done');
            // this._router.navigate(['/allOrders']);
          },
          error: (err) => {
            this.loading = false;
            // console.log(err);
            this._toastService.showError(err.error.error);
          },
        });
    }
  }

  omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const clone = { ...obj };
    keys.forEach((key) => delete clone[key]);
    return clone;
  }
}
