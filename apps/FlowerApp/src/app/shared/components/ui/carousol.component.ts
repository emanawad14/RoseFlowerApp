import { GalleriaModule } from 'primeng/galleria';
import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnComponent } from "./primary-btn.component";
 
@Component({
  selector: 'app-carousol',
  imports: [CommonModule, GalleriaModule, PrimaryBtnComponent],
  templateUrl: './carousol.component.html',
  styleUrl: './carousol.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CarousolComponent {
  labelName = signal('Shop Now');
//showIndicators = window.innerWidth >= 1024;


  responsiveOptions: any[] = [
      {
            breakpoint: '1500px',
             showIndicators:true
        },
        {
            breakpoint: '1024px',
              showIndicators:true
        },
        {
            breakpoint: '768px',
             showIndicators:true
        },
        {
            breakpoint: '560px',
             showIndicators:false
        },
        {
            breakpoint: '1300px',
            showIndicators:true
        },
        {
            breakpoint: '575px',
            showIndicators:false
        }
    ];
  giftsList = [
    {
      itemImageSrc: '/images/slide1.jpg',
      thumbnailImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
      alt: 'Culpa ducimus nesciunt aliquam non rerum esse recusandae omnis. Rerum optio dolores et.',
      title: 'Best Gift Shop',
      subTitle: 'Choose Perfect gifts From Us',
    },
    {
      itemImageSrc: '/images/slide2.jpg',
      alt: 'Culpa ducimus nesciunt aliquam non rerum esse recusandae omnis. Rerum optio dolores et.',
      title: 'Best Gift Shop',
      subTitle: 'Choose Perfectfts From Us',
    },
    {
      itemImageSrc: '/images/slide3.jpg',
      alt: 'Culpa ducimus nesciunt aliquam non rerum esse recusandae omnis. Rerum optio dolores et.',
      title: 'Best Gift Shop',
      subTitle: 'Choose Perfectfts From Us',
    },
    {
      itemImageSrc: '/images/slide4.jpg',

      alt: 'Culpa ducimus nesciunt aliquam non rerum esse recusandae omnis. Rerum optio dolores et.',
      title: 'Best Gift Shop',
      subTitle: 'Choose Perfectfts From Us',
    },
  ];
  constructor( ){
    
  }
  ngOnInit() {
  
}
}
