import { Product } from '../../../features/interfaces/products';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ProductCartComponent } from "../ui/productCart.component";

@Component({
  selector: 'app-shared-products',
  imports: [CommonModule, CardModule, ButtonModule, FormsModule, RatingModule, ProductCartComponent],
  templateUrl: './sharedProducts.component.html',
  styleUrl: './sharedProducts.component.scss',
})
export class SharedProductsComponent {
  @Input() products: Product[] = [];
  //grid col numbers
  @Input() popularItems: boolean = false;
}
