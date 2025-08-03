import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnComponent } from 'apps/FlowerApp/src/app/shared/components/ui/primary-btn.component';
import { GlobalInputComponent } from 'apps/FlowerApp/src/app/shared/components/ui/globalInput.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import {
  selectCartProductData,
  selectError,
  selectIsLoading,
} from '../store/reducers';
import { cartActions } from '../store/actions';
import { AddToCartResponseDTO } from '../interfaces/addToCartResponse.interface';
@Component({
  selector: 'app-cart',
  imports: [CommonModule, PrimaryBtnComponent, GlobalInputComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  data$!: Observable<{
    getProductsCartResponse: AddToCartResponseDTO | null;
    isLoading: boolean;
    error: any;
  }>;

  constructor(private _router: Router, private store: Store) {}
  ngOnInit(): void {
    this.data$ = combineLatest({
      getProductsCartResponse: this.store.select(selectCartProductData),
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
    });

    this.store.dispatch(cartActions['getLogged-User-Cart']());
  }
  goToProductsListPage() {
    this._router.navigate(['/product-list']);
  }
  removeFromCart(productId: string) {
    this.store.dispatch(
      cartActions.deleteProductFromCard({ product: productId })
    );
  }
  decrementPrice() {
    console.log('decrement');
  }
  incrementPrice(product: any) {
    console.log('increment');
    //.quantity++;
  }
}
