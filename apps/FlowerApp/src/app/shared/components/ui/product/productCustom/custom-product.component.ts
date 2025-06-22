import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { Product } from './../../../../../features/interfaces/products';

@Component({
  selector: 'app-custom-product',
  imports: [CommonModule, CardModule, ButtonModule, FormsModule, RatingModule],
  templateUrl: './custom-product.component.html',
  styleUrl: './custom-product.component.scss',
})
export class CustomProductComponent {
  @Input() product!: Product;
}
