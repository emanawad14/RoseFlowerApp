import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  Type,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { PrimaryBtnComponent } from 'apps/FlowerApp/src/app/shared/components/ui/primary-btn.component';
import { StepperComponent } from 'apps/FlowerApp/src/app/shared/components/ui/stepper.component';
import { Address } from 'apps/FlowerApp/src/app/shared/interfaces/addressResponse.interface';
import { AddressService } from '../services/address.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { AddressesComponent } from 'apps/FlowerApp/src/app/shared/components/ui/addresses.component';
import { PaymentMethod } from '../interfaces/paymentMethod.interface';
import { OrdersService } from '../services/orders.service';
import { ToastService } from 'apps/FlowerApp/src/app/shared/services/toast.service';
import { Router } from '@angular/router';
import { ShippingAddress } from '../interfaces/createOrderRequest.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddressDialogComponent } from '../../address/components/addressDialog.component';
import { removeUnWantedProperties } from 'apps/FlowerApp/src/app/core/utills/app.utills';

import { Store } from '@ngrx/store';
import { DialogViewEnum } from '../../address/types/viewDialogType.enum';
import { addressActions } from '../../address/store/actions';

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
  providers: [DialogService],
})
export class ShippingAddressComponent implements OnInit, OnDestroy {
  private ref?: DynamicDialogRef;
  stepNumber: number = 1;
  private destroy$ = new Subject<void>();
  selectedPayment: PaymentMethod | null = null;
  selectedAddress: WritableSignal<Address | null> = signal(null);
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
  ///checkout Loading
  loading = false;

  constructor(
    private _AddressService: AddressService,
    private _OrdersService: OrdersService,
    private _toastService: ToastService,
    private _router: Router,
    private _dialogService: DialogService,
    private store: Store
  ) {}
  ngOnInit(): void {
    this.selectedAddress = this._AddressService.selectedAddress;
    //this.currentDialogView$ = this.store.select(selectCurrentDialogView);
  }

  setPaymentMethod(paymentMethod: PaymentMethod) {
    this.selectedPayment = paymentMethod;
  }
  checkout() {
    this.loading = true;
    ///remove _id and username from request//////////////
    const shippingAddress = removeUnWantedProperties(
      this._AddressService.selectedAddress() as Address,
      ['username', '_id']
    );

    if (!this._AddressService.selectedAddress() || !this.selectedPayment) {
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
  openAddressDialog() {
    this.ref = this._dialogService.open(AddressDialogComponent, {
      width: '70vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      closable: true,
    });
    this.ref.onClose.subscribe(() => {
      // this._DialogContentService.selectedComponentView.set(
      //   GetAddressesComponent
      // );

      this.store.dispatch(
        addressActions.openDialogComponent({ view: DialogViewEnum.getAddresses })
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.ref?.close();
  }
}
