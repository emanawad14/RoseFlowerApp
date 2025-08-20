import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../../features/interfaces/products';
import { Subscription } from 'rxjs';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Catigory } from '../../../../features/interfaces/catigory.FlowerApp';
import { Carousel } from 'primeng/carousel';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedProductsComponent } from '../../business/sharedProducts.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    FormsModule,
    RatingModule,
    Carousel,
    TranslatePipe,
    SharedProductsComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit, OnDestroy {
  private readonly _ProductService = inject(ProductService);
  sub!: Subscription;
  products: Product[] = [];
  @Input() categories!: Catigory[];
  activeCategory = 'all';
  carouselItems!: any[];

  ngOnInit(): void {
    this.getAllproducts();
    this.carouselItems = ['all', ...this.categories];
  }

  filterByCategory(categoryId: string) {
    this.activeCategory = categoryId;
    if (categoryId === 'all') {
      this.getAllproducts();
    } else {
      this.getProductsByCategory(categoryId);
    }
  }

  getAllproducts() {
    this.sub = this._ProductService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.products;
      },
    });
  }

  getProductsByCategory(categoryId: string) {
    this.sub = this._ProductService
      .getProductByCategoryId(categoryId)
      .subscribe({
        next: (response) => {
          this.products = response.products;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
