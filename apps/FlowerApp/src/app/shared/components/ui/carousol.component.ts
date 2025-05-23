import { GalleriaModule } from 'primeng/galleria';
import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnComponent } from './primary-btn.component';
import { Gift } from '../../interfaces/gift';

@Component({
  selector: 'app-carousol',
  imports: [CommonModule, GalleriaModule, PrimaryBtnComponent],
  templateUrl: './carousol.component.html',
  styleUrl: './carousol.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CarousolComponent {
  labelName = 'Shop Now';
  giftsList: Gift[] = [
    {
      id: '1',
      bgImg: '/images/slide1.jpg',
      description:
        'Culpa ducimus nesciunt aliquam non rerum esse recusandae omnis. Rerum optio dolores et.',
      title: 'Best Gift Shop',
      subTitle: 'Choose Perfect gifts From Us',
    },
    {
      id: '2',
      bgImg: '/images/slide2.jpg',
      description:
        'Culpa ducimus nesciunt aliquam non rerum esse recusandae omnis. Rerum optio dolores et.',
      title: 'Best Gift Shop',
      subTitle: 'Choose Perfectfts From Us',
    },
    {
      id: '3',
      bgImg: '/images/slide3.jpg',
      description:
        'Culpa ducimus nesciunt aliquam non rerum esse recusandae omnis. Rerum optio dolores et.',
      title: 'Best Gift Shop',
      subTitle: 'Choose Perfectfts From Us',
    },
    {
      id: '4',
      bgImg: '/images/slide4.jpg',

      description:
        'Culpa ducimus nesciunt aliquam non rerum esse recusandae omnis. Rerum optio dolores et.',
      title: 'Best Gift Shop',
      subTitle: 'Choose Perfectfts From Us',
    },
  ];
}
