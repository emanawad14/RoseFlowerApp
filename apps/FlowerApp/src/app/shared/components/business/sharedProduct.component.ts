import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-shared-product',
  imports: [CommonModule ,    CardModule,
          ButtonModule,
          FormsModule,
          RatingModule,
          Carousel,],
  templateUrl: './sharedProduct.component.html',
  styleUrl: './sharedProduct.component.scss',
})
export class SharedProductComponent {}
