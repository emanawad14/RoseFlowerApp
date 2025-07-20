import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestComponent } from "../../home/components/Best/Best.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { HomeService } from '../../../services/home/home.service';
import { MyTranslateService } from 'apps/FlowerApp/src/app/core/services/my-translate-service.service';
import { Subscription } from 'rxjs';
import { IItems } from '../../../interfaces/i-items';

@Component({
  selector: 'app-related-products',
  imports: [CommonModule, CarouselModule,
      RatingModule,
      FormsModule,
      CardModule
      
      ],
  templateUrl: './relatedProducts.component.html',
  styleUrl: './relatedProducts.component.scss',
})
export class RelatedProductsComponent {


   bests: IItems[] = [];
  homeUnSubscribe: Subscription = new Subscription();
  langSub: Subscription = new Subscription();

  constructor(public _TranslateService: MyTranslateService) {}

  private readonly homeServices = inject(HomeService);

  customOptions: OwlOptions = {
    loop: true,
    rtl: false,
    margin: 3,
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
    this.getHomeScreens();
    this.setNavText(this._TranslateService.currentLang);
    this.langSub = this._TranslateService.onLangChange.subscribe(() => {
      this.setNavText(this._TranslateService.currentLang);
    });
  }

  getHomeScreens() {
    this.homeUnSubscribe = this.homeServices.getHomeScreen().subscribe({
      next: (res) => {
        this.bests = res.bestSeller;
      },
      error: (err) => console.log(err),
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
    this.homeUnSubscribe.unsubscribe();
    this.langSub.unsubscribe();
  }
}
