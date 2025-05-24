import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../../features/interfaces/products';
import { Subscription } from 'rxjs';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product',
  imports: [CommonModule, CardModule, ButtonModule, FormsModule, Rating],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit, OnDestroy {
  private readonly _ProductService = inject(ProductService);
  sub!: Subscription;
  products: Product[] = [];
  // constructor() {}
  ngOnInit(): void {
    this.getAllproducts();
  }

  getAllproducts() {
    this.sub = this._ProductService.getAllProducts().subscribe({
      next: (response) => {
        console.log(response.products);
        this.products = response.products;
      },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
