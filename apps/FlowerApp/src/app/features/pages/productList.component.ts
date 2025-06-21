import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../../core/layouts/navBar/navBar.component";
import { GlobalInputComponent } from '../../shared/components/ui/globalInput.component';
import { GlobalCkeckboxComponent } from '../../shared/components/ui/globalCkeckbox.component';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, NavBarComponent,GlobalInputComponent,GlobalCkeckboxComponent],
  templateUrl: './productList.component.html',
  styleUrl: './productList.component.scss',
})
export class ProductListComponent {}
