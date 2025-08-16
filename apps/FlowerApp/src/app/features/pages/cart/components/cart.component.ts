import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnComponent } from 'apps/FlowerApp/src/app/shared/components/ui/primary-btn.component';
import { GlobalInputComponent } from 'apps/FlowerApp/src/app/shared/components/ui/globalInput.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import {
  selectCartProductData,
  selectIsLoading,
  selectNumberOfCartItems,
} from '../store/reducers';
import { cartActions } from '../store/actions';
import { ConfirmDialogComponent } from 'apps/FlowerApp/src/app/shared/components/ui/confirmDialog.component';
import { ToastModule } from 'primeng/toast';
import { LoadingComponent } from 'apps/FlowerApp/src/app/shared/components/ui/loading.component';
import { CartStates } from '../interfaces/getProductsCartState.interface';
import { Product } from '../../../interfaces/products';
import { CartItem } from '../interfaces/addToCartResponse.interface';
import { ToastService } from 'apps/FlowerApp/src/app/shared/services/toast.service';
@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    PrimaryBtnComponent,
    GlobalInputComponent,
    ConfirmDialogComponent,
    ToastModule,
    LoadingComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  data$!: Observable<CartStates>;
  @ViewChild(ConfirmDialogComponent) confirmDialog!: ConfirmDialogComponent;

  constructor(
    private _router: Router,
    private store: Store,
    private _toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.data$ = combineLatest({
      getProductsCartResponse: this.store.select(selectCartProductData),
      isLoading: this.store.select(selectIsLoading),
      numberOfItemsInCart: this.store.select(selectNumberOfCartItems),
    });

    this.store.dispatch(cartActions['getLoggedUserCart']());
  }
  goToProductsListPage() {
    this._router.navigate(['/product-list']);
  }
  removeFromCart(productId: string, productName: string) {
    this.confirmDialog.confirmDialog(`Will remove ${productName}`, () => {
      // confirmed: handle deletion logic
      this.store.dispatch(
        cartActions.deleteProductFromCart({ product: productId })
      );

      // this._MessageService.add({
      //   severity: 'success',
      //   summary: 'Confirmed',
      //   detail: 'Cart deleted',
      // });
    });
    // this.store.dispatch(
    //   cartActions.deleteProductFromCard({ product: productId })
    // );
  }
  removeCart() {
    this.confirmDialog.confirmDialog(
      'Are You sure you want to remove cart',
      () => {
        // confirmed: handle deletion logic
        this.store.dispatch(cartActions.deleteCart());
        console.log('Cart deleted:');
        // this._MessageService.add({
        //   severity: 'success',
        //   summary: 'Confirmed',
        //   detail: 'Cart deleted',
        // });
      }
    );
    //this.store.dispatch(cartActions.deleteCart());
  }

  changeProductQuantity(
    cartItem: CartItem,
    quantity: number,
    productId: string
  ) {
    console.log(productId);

    if (quantity >= 1 || cartItem.quantity >= quantity)
      this.store.dispatch(
        cartActions.updateProductQuantityFromCart({
          product: productId,
          quantity: quantity,
        })
      );
    else {
      this._toastService.showError('out of stock ');
    }
  }
}
