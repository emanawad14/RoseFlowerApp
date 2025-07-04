import { Product } from './../../../features/interfaces/products';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-cart',
  imports: [CommonModule ,RatingModule,
    FormsModule,
    CardModule,
        CarouselModule, ],
  templateUrl: './productCart.component.html',
  styleUrl: './productCart.component.scss',
})
export class ProductCartComponent {

  @Input() product! :Product



   customOptions: OwlOptions = {
      loop: true,
      rtl: true, // this.lang=='ar' ? true : false
      margin: 2,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: [
        '<i class="pi pi-chevron-left text-lg "></i>',
        '<i class="pi pi-chevron-right text-lg"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        460: {
          items: 2,
        },
  
        840: {
          items: 3,
        },
      },
      nav: true,
    };
    setNavText(lang: string) {
      if (lang === 'ar') {
        this.customOptions.rtl = true;
        this.customOptions.navText = [
          '<i class="pi pi-chevron-right text-lg"></i>',
          '<i class="pi pi-chevron-left text-lg"></i>',
        ];
      } else {
        this.customOptions.rtl = false;
        this.customOptions.navText = [
          '<i class="pi pi-chevron-left text-lg"></i>',
          '<i class="pi pi-chevron-right text-lg"></i>',
        ];
      }
    }
}
