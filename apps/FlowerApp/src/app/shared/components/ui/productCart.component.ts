import { Product } from './../../../features/interfaces/products';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { cartActions } from '../../../features/pages/cart/store/actions';
@Component({
  selector: 'app-product-cart',
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    CardModule,
    CarouselModule,
  ],
  templateUrl: './productCart.component.html',
  styleUrl: './productCart.component.scss',
})
export class ProductCartComponent {
  @Input() product!: Product;
  constructor(private _Router: Router,private store:Store) {}

  openProductDetails(productId: string) {
    this._Router.navigate(['/product-details', productId]);
  }


    addProductToCart(productId: string) {
      
      this.store.dispatch(
        cartActions.addProductToCard({ product: productId, quantity: 1 })
      );
    }
  
}
