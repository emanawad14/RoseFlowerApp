import { GalleriaModule } from 'primeng/galleria';
import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnComponent } from './primary-btn.component';
import { Gift } from '../../interfaces/gift';
import { MyTranslateService } from '../../../core/services/myTranslate/my-translate.service';

@Component({
  selector: 'app-carousol',
  imports: [CommonModule, GalleriaModule, PrimaryBtnComponent],
  templateUrl: './carousol.component.html',
  styleUrl: './carousol.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CarousolComponent {
 labelName = '';

giftsList: Gift[] = [];

constructor(private translate: MyTranslateService) {}

ngOnInit(): void {
  this.loadTranslations();
  this.translate.onLangChange.subscribe(() => {
    this.loadTranslations();
  });
}

private loadTranslations(): void {
  this.translate.get([
    'GiftSlides.ShopNow',
    'GiftSlides.Title1',
    'GiftSlides.SubTitle1',
    'GiftSlides.Description',

    'GiftSlides.Title2',
    'GiftSlides.SubTitle2',

    'GiftSlides.Title3',
    'GiftSlides.SubTitle3',

    'GiftSlides.Title4',
    'GiftSlides.SubTitle4'
  ]).subscribe(translations => {
    this.labelName = translations['GiftSlides.ShopNow'];
    this.giftsList = [
      {
        id: '1',
        bgImg: '/images/slide1.jpg',
        title: translations['GiftSlides.Title1'],
        subTitle: translations['GiftSlides.SubTitle1'],
        description: translations['GiftSlides.Description']
      },
      {
        id: '2',
        bgImg: '/images/slide2.jpg',
        title: translations['GiftSlides.Title2'],
        subTitle: translations['GiftSlides.SubTitle2'],
        description: translations['GiftSlides.Description']
      },
      {
        id: '3',
        bgImg: '/images/slide3.jpg',
        title: translations['GiftSlides.Title3'],
        subTitle: translations['GiftSlides.SubTitle3'],
        description: translations['GiftSlides.Description']
      },
      {
        id: '4',
        bgImg: '/images/slide4.jpg',
        title: translations['GiftSlides.Title4'],
        subTitle: translations['GiftSlides.SubTitle4'],
        description: translations['GiftSlides.Description']
      }
    ];
  });
}
}
