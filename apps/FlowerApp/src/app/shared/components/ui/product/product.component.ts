import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../../features/interfaces/products';
import { map, Subscription } from 'rxjs';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Catigory } from '../../../../features/interfaces/catigory.FlowerApp';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedProductsComponent } from '../../business/sharedProducts.component';
import { CatigoryService } from 'apps/FlowerApp/src/app/features/services/catigory.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    FormsModule,
    RatingModule,
    TranslatePipe,
    SharedProductsComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit, OnDestroy {
  private readonly _ProductService = inject(ProductService);
  sub: Subscription[] = [];
  products: Product[] = [];
  categories!: Catigory[];
  activeCategory = 'all';

  private readonly _catigory = inject(CatigoryService);
  ngOnInit(): void {
    this.getAllproducts();
    this.GetCatigorys();
  }
  GetCatigorys() {
    // console.log('Fetching categories...');
    const sub = this._catigory
      .getCatigory()
      .pipe(
        map((data) => data.categories.filter((item) => item.productsCount > 0))
      )
      .subscribe({
        next: (response) => {
          // console.log('Categories received:', response);
          this.categories = [
            {
              _id: 'all',
              name: 'All Products',
              slug: 'string',
              image: 'string',
              createdAt: 'string',
              updatedAt: 'string',
              productsCount: 10,
            },
            ...response,
          ];
        },
        error: (error) => {
          // console.error('Error fetching categories:', error);
        },
      });
    this.sub.push(sub);
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
    const sub = this._ProductService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.products;
      },
    });
    this.sub.push(sub);
  }

  getProductsByCategory(categoryId: string) {
    const sub = this._ProductService
      .getProductByCategoryId(categoryId)
      .subscribe({
        next: (response) => {
          this.products = response.products;
        },
      });
    this.sub.push(sub);
  }

  ngOnDestroy(): void {
    this.sub.forEach((sub) => sub.unsubscribe());
  }
}
