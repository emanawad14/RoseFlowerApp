import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RelatedProductsComponent } from '../../product-details/components/relatedProducts.component';
import { IItems } from '../../../interfaces/i-items';
import { HomeService } from '../../../services/home/home.service';
import { Subscription } from 'rxjs';
import { GlobalInputComponent } from "apps/FlowerApp/src/app/shared/components/ui/globalInput.component";
import { PrimaryBtnComponent } from "apps/FlowerApp/src/app/shared/components/ui/primary-btn.component";

@Component({
  selector: 'app-cart-layout',
  imports: [CommonModule, RouterModule, RelatedProductsComponent, GlobalInputComponent, PrimaryBtnComponent],
  templateUrl: './cartLayout.component.html',
  styleUrl: './cartLayout.component.scss',
})
export class CartLayoutComponent implements OnInit, OnDestroy {
  bestSellerProducts: IItems[] = [];
  private readonly _homeServices = inject(HomeService);
  bestSellerProductsSub: Subscription = new Subscription();
  constructor() {}

  ngOnInit(): void {
    this.getBsetSellerProducts();
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
