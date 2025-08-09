import { MessageService } from 'primeng/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../interfaces/products';
import {
  ProductDetailsDTO,
  RelatedProductsDTO,
} from './interfaces/product.interface';
import { GalleriaModule } from 'primeng/galleria';
import { Dialog } from 'primeng/dialog';
import { PrimaryBtnComponent } from '../../../shared/components/ui/primary-btn.component';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { ProductReviewComponent } from './components/productReview.component';
import { RelatedProductsComponent } from './components/relatedProducts.component';
import { Store } from '@ngrx/store';
import { cartActions } from '../cart/store/actions';
import {
  selectAddToCartLoading,
  selectError,
  selectNumberOfCartItems,
} from '../cart/store/reducers';
import { ToastModule } from 'primeng/toast';
import { CartStates } from '../cart/interfaces/getProductsCartState.interface';
import { ToastService } from '../../../shared/services/toast.service';
@Component({
  selector: 'app-product-detail',
  imports: [
    CommonModule,
    GalleriaModule,
    Dialog,
    PrimaryBtnComponent,
    ProductReviewComponent,
    RelatedProductsComponent,
    ToastModule,
  ],
  templateUrl: './productDetail.component.html',
  styleUrl: './productDetail.component.scss',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productImages: string[] = [];
  relatedProducts: Product[] = [];
  productId!: string;
  // addProductLoading$: Observable<boolean> = of(false);
  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 6,
    },
    // {
    //   breakpoint: '1199px',
    //   numVisible: 3,
    // },
    // {
    //   breakpoint: '767px',
    //   numVisible: 2,
    // },
    {
      breakpoint: '575px',
      numVisible: 3,
    },
  ];
  subs: Subscription[] = [];
  product?: Product;
  data$!: Observable<CartStates>;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private store: Store,
    // private actions$: Actions,
    private MessageService: MessageService,
    private toastService: ToastService
  ) {}
  // get safeLoading(): boolean {
  //   // If Angular has not emitted yet, treat as false
  //   let value: boolean | null = null;
  //   const sub = this.addProductLoading$.subscribe((v) => (value = v));
  //   this.subs.push(sub);
  //   return value ?? false;
  // }
  ngOnInit(): void {
    const sub = this._ActivatedRoute.params.subscribe((params) => {
      this.productId = params['id']; // example: /product-details/123
      this.getProduct();
    });
    this.subs.push(sub);

    this.data$ = combineLatest({
      // getProductsCartResponse: this.store.select(selectCartProductData),
      addToCartLoading: this.store.select(selectAddToCartLoading),
      error: this.store.select(selectError),
      numberOfItemsInCart: this.store.select(selectNumberOfCartItems),
    });
  }

  getProduct() {
    if (!this.productId) return;
    if (this.productId) {
      const sub = this._ProductService
        .getProductById(this.productId)
        .subscribe({
          next: (res: ProductDetailsDTO) => {
            this.product = res.product;
            this.productImages = [
              this.product?.imgCover!,
              ...this.product?.images!,
            ];
          },
        });
      this.subs.push(sub);
      this.getRelatedProducts(this.productId);
    }
  }

  getRelatedProducts(productId: string) {
    const sub = this._ProductService
      .getRelatedProductsById(productId)
      .subscribe({
        next: (res: RelatedProductsDTO) => {
          // console.log(res.relatedProducts);
          this.relatedProducts = res.relatedProducts;
        },
      });
    this.subs.push(sub);
  }
  addProductToCart(productId: string) {
    this.store.dispatch(
      cartActions.addProductToCart({ product: productId, quantity: 1 })
    );
  }

  displayDialog = false;
  selectedImageSrc: string = '';

  openImgDialog(image: string) {
    this.selectedImageSrc = image;
    this.displayDialog = true;
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
