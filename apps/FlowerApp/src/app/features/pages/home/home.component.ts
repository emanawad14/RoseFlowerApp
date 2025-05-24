import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../../shared/components/ui/product/product.component';
import { GiftUiComponent } from '../../../shared/components/ui/gift-ui.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductComponent, GiftUiComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
