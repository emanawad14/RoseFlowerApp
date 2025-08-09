import { MessageService } from 'primeng/api';
import { Product } from './../../../features/interfaces/products';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { cartActions } from '../../../features/pages/cart/store/actions';
import { ToastModule } from 'primeng/toast';

import {
  combineLatest,
  filter,
  Observable,
  pairwise,
  startWith,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { CartStates } from '../../../features/pages/cart/interfaces/getProductsCartState.interface';
import {
  selectAddToCartLoading,
  selectAddToCartProductId,
  selectError,
  selectNumberOfCartItems,
} from '../../../features/pages/cart/store/reducers';
import { LoadingComponent } from './loading.component';
@Component({
  selector: 'app-product-cart',
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    CardModule,
    CarouselModule,
    LoadingComponent,
    ToastModule,
  ],
  templateUrl: './productCart.component.html',
  styleUrl: './productCart.component.scss',
})
export class ProductCartComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  data$!: Observable<CartStates>;
  // private destroy$ = new Subject<void>();
  constructor(private _Router: Router, private store: Store) {}
  ngOnDestroy(): void {
    // this.destroy$.next();
    // this.destroy$.complete();
  }
  ngOnInit(): void {
    this.data$ = combineLatest({
      // getProductsCartResponse: this.store.select(selectCartProductData),
      addToCartLoading: this.store.select(selectAddToCartLoading),
      error: this.store.select(selectError),
      numberOfItemsInCart: this.store.select(selectNumberOfCartItems),
      addToCartProductId: this.store.select(selectAddToCartProductId),
    });
    // // Watch loading state and error to detect success/failure
    // this.store
    //   .select(selectAddToCartLoading)
    //   .pipe(startWith(false), pairwise(), takeUntil(this.destroy$))
    //   .subscribe(([prev, curr]) => {
    //     // When loading turns from true -> false
    //     if (prev === true && curr === false) {
    //       this.store
    //         .select(selectError)
    //         .pipe(take(1))
    //         .subscribe((error) => {
    //           if (error) {
    //             this.MessageService.add({
    //               severity: 'error',
    //               summary: 'Error',
    //               detail: 'Failed to add to cart',
    //             });
    //           } else {
    //             this.MessageService.add({
    //               severity: 'success',
    //               summary: 'Success',
    //               detail: 'Product added to cart',
    //             });
    //           }
    //         });
    //     }
    //   });
  }

  openProductDetails(productId: string) {
    this._Router.navigate(['/product-details', productId]);
  }
  addProductToCart(productId: string) {
    this.store.dispatch(
      cartActions.addProductToCart({ product: productId, quantity: 1 })
    );
  }
}
