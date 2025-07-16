import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalInputComponent } from "./globalInput.component";

@Component({
  selector: 'app-product-quantity',
  imports: [CommonModule, GlobalInputComponent],
  templateUrl: './productQuantity.component.html',
  styleUrl: './productQuantity.component.scss',
})
export class ProductQuantityComponent {}
