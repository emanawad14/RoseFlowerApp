import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { HomeService } from '../../services/home/home.service';
import { IItems } from '../../interfaces/i-items';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-best',
  imports: [ CommonModule, CarouselModule ],
  templateUrl: './Best.component.html',
  styleUrl: './Best.component.css',
})
export class BestComponent implements OnInit {


   bests:IItems[]=[]

    constructor(){}
    private readonly homeServices=inject(HomeService)

      ngOnInit(): void {
        this.homeServices.getHomeScreen().subscribe(
            {
                next:(res)=>
                {
                    
                    this.bests=res.bestSeller
                    console.log(res.bestSeller);
                    
                }
                ,
                error:(err)=>
                {
                    console.log(err);
                    
                }
            }
        )
    
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
    '<i class="pi pi-chevron-right text-lg"></i>'
  ],
 responsive: {
  0: {
    items: 1
  },
  600: {
    items: 3
  },
  940: {
    items: 3
  }
},
  nav: true
};

}
