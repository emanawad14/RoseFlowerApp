import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-cart-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './cartLayout.component.html',
  styleUrl: './cartLayout.component.scss',
})
export class CartLayoutComponent {}
