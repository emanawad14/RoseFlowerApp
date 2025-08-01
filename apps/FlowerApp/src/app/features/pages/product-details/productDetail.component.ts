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
import { Subscription } from 'rxjs';
import { ProductReviewComponent } from './components/productReview.component';
import { RelatedProductsComponent } from './components/relatedProducts.component';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [
    CommonModule,
    GalleriaModule,
    Dialog,
    PrimaryBtnComponent,
    ProductReviewComponent,
    RelatedProductsComponent,
  ],
  templateUrl: './productDetail.component.html',
  styleUrl: './productDetail.component.scss',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productImages: string[] = [];
  relatedProducts: Product[] = [];
  productId!: string;

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
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    const sub = this._ActivatedRoute.params.subscribe((params) => {
      this.productId = params['id']; // example: /product-details/123
      this.getProduct();
    });
    this.subs.push(sub);
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
    this._CartService
      .addProductToCart({ product: productId, quantity: 1 })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
      });
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
