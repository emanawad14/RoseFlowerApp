import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../services/home/home.service';
import { IItems } from '../../interfaces/i-items';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-best',
  imports: [
    CommonModule,
    CarouselModule,
    RatingModule,
    FormsModule,
    CardModule,
  ],
  templateUrl: './Best.component.html',
  styleUrl: './Best.component.scss',
})
export class BestComponent implements OnInit, OnDestroy {
  bests: IItems[] = [];

  // constructor(){}
  private readonly homeServices = inject(HomeService);
  homeUnSubscribe: Subscription = new Subscription();

  ngOnInit(): void {
    this.getHomeScreens();
  }

  getHomeScreens() {
    this.homeUnSubscribe = this.homeServices.getHomeScreen().subscribe({
      next: (res) => {
        this.bests = res.bestSeller;
        // console.log(res.bestSeller);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  customOptions: OwlOptions = {
    loop: true,
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

  ngOnDestroy(): void {
    this.homeUnSubscribe.unsubscribe();
  }
}
