import { Store } from '@ngrx/store';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RelatedProductsComponent } from '../../product-details/components/relatedProducts.component';
import { IItems } from '../../../interfaces/i-items';
import { HomeService } from '../../../services/home/home.service';
import { Subscription, Observable, map } from 'rxjs';
import { GlobalInputComponent } from 'apps/FlowerApp/src/app/shared/components/ui/globalInput.component';
import { PrimaryBtnComponent } from 'apps/FlowerApp/src/app/shared/components/ui/primary-btn.component';
import { selectCartProductData } from '../store/reducers';
import { AddToCartResponseDTO } from '../interfaces/addToCartResponse.interface';

@Component({
  selector: 'app-cart-layout',
  imports: [
    CommonModule,
    RouterModule,
    RelatedProductsComponent,
    GlobalInputComponent,
    PrimaryBtnComponent,
  ],
  templateUrl: './cartLayout.component.html',
  styleUrl: './cartLayout.component.scss',
})
export class CartLayoutComponent implements OnInit, OnDestroy {
  cartData$!: Observable<AddToCartResponseDTO | null>;
  totalPrice$!: Observable<number>;
  bestSellerProducts: IItems[] = [];
  bestSellerProductsSub: Subscription = new Subscription();
  constructor(private store: Store, private _homeServices: HomeService) {}

  ngOnInit(): void {
    this.getBsetSellerProducts();
    this.cartData$ = this.store.select(selectCartProductData);
    this.totalPrice$ = this.cartData$.pipe(
      map((data) => data?.cart.totalPrice ?? 0)
    );
  }
  getBsetSellerProducts() {
    this.bestSellerProductsSub = this._homeServices.getHomeScreen().subscribe({
      next: (res) => {
        this.bestSellerProducts = res.bestSeller;
      },
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    this.bestSellerProductsSub.unsubscribe();
  }
}
