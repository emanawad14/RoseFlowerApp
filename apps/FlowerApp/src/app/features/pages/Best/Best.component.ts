import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../services/home/home.service';
import { IItems } from '../../interfaces/i-items';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../../core/services/myTranslate/my-translate.service';

@Component({
  selector: 'app-best',
  imports: [
    CommonModule,
    CarouselModule,
    RatingModule,
    FormsModule,
    CardModule,
    TranslatePipe
  ],
  templateUrl: './Best.component.html',
  styleUrl: './Best.component.scss',
})
export class BestComponent implements OnInit, OnDestroy {
  bests: IItems[] = [];

  constructor(public myTranslateService: MyTranslateService) {}
  private readonly homeServices = inject(HomeService);
  homeUnSubscribe: Subscription = new Subscription();

  

  ngOnInit(): void {

     this.getHomeScreens();
    const currentLang = this.myTranslateService.currentLang || 'en';
    this.setNavText(currentLang);
    
    this.myTranslateService.onLangChange.subscribe((event) => {
      this.setNavText(event.lang);
    });
  }

  getHomeScreens() {
    this.homeUnSubscribe = this.homeServices.getHomeScreen().subscribe({
      next: (res) => {
        this.bests = res.bestSeller;
      },
      error: (err) => {
        console.log(err);
      },
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



  customOptions: OwlOptions = {
    loop: true,
    margin: 2,
    mouseDrag: true,
   rtl:true
  ,

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




  ngOnDestroy(): void {
    this.homeUnSubscribe.unsubscribe();
  }
}
