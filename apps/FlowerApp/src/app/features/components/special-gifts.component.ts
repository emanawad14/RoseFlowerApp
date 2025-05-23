import { ImageContainerComponent } from './../../shared/components/ui/image-container.component';
import { Component, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftUiComponent } from '../../shared/components/ui/gift-ui.component';
import { Gift } from '../../shared/interfaces/gift';
import { CarousolComponent } from '../../shared/components/ui/carousol.component';
// import { GalleriaModule } from 'primeng/galleria';
//GalleriaModule
@Component({
  selector: 'app-special-gifts',
  imports: [
    CommonModule,
    GiftUiComponent,
    ImageContainerComponent,
    CarousolComponent,
  ],
  templateUrl: './special-gifts.component.html',
  styleUrl: './special-gifts.component.scss',
})
export class SpecialGiftsComponent {
  gifts: Gift[] = [
    {
      id: '0',
      bgImg: '/images/Confetti.png',
      title: 'Gifts Box',
      btnText: 'Shop Now',
      description: 'Awesome Gifts Box Collectons',
    },
    {
      id: ' 1',
      bgImg: '/images/holding-gift.png',
      title: 'Occasion Gifts',
      btnText: 'Discover Now',
      description: 'Best Occasion Gifts Collections',
    },
    {
      id: '2',
      bgImg: '/images/Confetti.png',
      title: 'Occasion Gifts',
      btnText: 'Discover Now',
      description: 'Combo Sets Gift Box Up To 50% Off',
    },
  ];
  ngOnInit() {}
}
