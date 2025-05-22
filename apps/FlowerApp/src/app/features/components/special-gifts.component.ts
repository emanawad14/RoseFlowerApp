import { ImageContainerComponent } from './../../shared/components/ui/image-container.component';
import { Component, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnComponent } from '../../shared/components/ui/primary-btn.component';
import { GiftUiComponent } from '../../shared/components/ui/gift-ui.component';
import { Gift } from '../../shared/interfaces/gift';
import { CarousolComponent } from "../../shared/components/ui/carousol.component";
// import { GalleriaModule } from 'primeng/galleria';
//GalleriaModule
@Component({
  selector: 'app-special-gifts',
  imports: [CommonModule, GiftUiComponent, ImageContainerComponent, CarousolComponent],
  templateUrl: './special-gifts.component.html',
  styleUrl: './special-gifts.component.scss',
})
export class SpecialGiftsComponent {
  labelName = signal('Shop Now');
  gifts: Gift[] = [
    {
      id: 0,
      bgImg: '/images/Confetti.png',
      title: 'Gifts Box',
      btnText: signal('Shop Now'),
      description: 'Awesome Gifts Box Collectons',
    },
    {
      id: 1,
      bgImg: '/images/holding-gift.png',
      title: 'Occasion Gifts',
      btnText: signal('Discover Now'),
      description: 'Best Occasion Gifts Collections',
    },
    {
      id: 2,
      bgImg: '/images/Confetti.png',
      title: 'Occasion Gifts',
      btnText: signal('Discover Now'),
      description: 'Combo Sets Gift Box Up To 50% Off',
    },
  ];
  //////////////////////
  giftsList: any = [];
  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];
  ngOnInit() {
    this.giftsList = [
      {
        itemImageSrc:
          '../../../../public/images/Red christmas gifts with white ribbon.png',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
        alt: 'Description 1',
        title: 'Title 1',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
        alt: 'Description 2',
        title: 'Title 2',
      },
      // Add more items...
    ];
  }
}
