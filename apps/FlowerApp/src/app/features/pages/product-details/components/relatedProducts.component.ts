import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { MyTranslateService } from 'apps/FlowerApp/src/app/core/services/my-translate-service.service';
import { Subscription } from 'rxjs';
import { Product } from '../../../interfaces/products';
import { ProductCartComponent } from "apps/FlowerApp/src/app/shared/components/ui/productCart.component";

@Component({
  selector: 'app-related-products',
  imports: [
    CommonModule,
    CarouselModule,
    RatingModule,
    FormsModule,
    CardModule,
    ProductCartComponent
],
  templateUrl: './relatedProducts.component.html',
  styleUrl: './relatedProducts.component.scss',
})
export class RelatedProductsComponent {
  @Input({ required: true }) products: Product[] = [];
  langSub: Subscription = new Subscription();

  constructor(public _TranslateService: MyTranslateService) {}

  customOptions: OwlOptions = {
    loop: true,
    rtl: false,
    margin: 16,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 4,
      },
      1024: {
        items: 4,
      },
      1280: {
        items: 4,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.setNavText(this._TranslateService.currentLang);
    this.langSub = this._TranslateService.onLangChange.subscribe(() => {
      this.setNavText(this._TranslateService.currentLang);
    });
  }

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

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }
}
