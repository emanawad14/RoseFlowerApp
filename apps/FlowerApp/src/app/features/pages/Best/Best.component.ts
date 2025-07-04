import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../services/home/home.service';
import { IItems } from '../../interfaces/i-items';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { PrimaryBtnComponent } from '../../../shared/components/ui/primary-btn.component';
import { MyTranslateService } from '../../../core/services/my-translate-service.service';
import { ProductCartComponent } from '../../../shared/components/ui/productCart.component';

@Component({
  selector: 'app-best',
  imports: [
    CommonModule,
    CarouselModule,
    RatingModule,
    FormsModule,
    CardModule,
    TranslatePipe,
    PrimaryBtnComponent,
    ProductCartComponent
  ],
  templateUrl: './Best.component.html',
  styleUrl: './Best.component.scss',
})
export class BestComponent implements OnInit, OnDestroy {
  // bests: IItems[] = [];
 
  // constructor(public _TranslateService: MyTranslateService) {}
  // private readonly homeServices = inject(HomeService);
  // homeUnSubscribe: Subscription = new Subscription();

  // ngOnInit(): void {
  //   this.getHomeScreens();
  //   this.setNavText('en');
    
  // }

  // getHomeScreens() {
  //   this.homeUnSubscribe = this.homeServices.getHomeScreen().subscribe({
  //     next: (res) => {
  //       this.bests = res.bestSeller;
        
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // customOptions: OwlOptions = {
  //   loop: true,
  //   rtl: true, 
  //   margin: 2,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: [
  //     '<i class="pi pi-chevron-left text-lg "></i>',
  //     '<i class="pi pi-chevron-right text-lg"></i>',
  //   ],
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     460: {
  //       items: 2,
  //     },

  //     840: {
  //       items: 3,
  //     },
  //   },
  //   nav: true,
  // };
  // setNavText(lang: string) {
  //   if (lang === 'ar') {
  //     this.customOptions.rtl = true;
  //     this.customOptions.navText = [
  //       '<i class="pi pi-chevron-right text-lg"></i>',
  //       '<i class="pi pi-chevron-left text-lg"></i>',
  //     ];
  //   } else {
  //     this.customOptions.rtl = false;
  //     this.customOptions.navText = [
  //       '<i class="pi pi-chevron-left text-lg"></i>',
  //       '<i class="pi pi-chevron-right text-lg"></i>',
  //     ];
  //   }
  // }
  // ngOnDestroy(): void {
  //   this.homeUnSubscribe.unsubscribe();
  // }




   bests: IItems[] = [];
  homeUnSubscribe: Subscription = new Subscription();
  langSub: Subscription = new Subscription();

  constructor(public _TranslateService: MyTranslateService) {}

  private readonly homeServices = inject(HomeService);

  customOptions: OwlOptions = {
    loop: true,
    rtl: false, 
    margin: 2,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [],
    responsive: {
      0: { items: 1 },
      460: { items: 2 },
      840: { items: 3 },
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
