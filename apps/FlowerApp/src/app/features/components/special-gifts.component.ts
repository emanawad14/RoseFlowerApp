import { ImageContainerComponent } from './../../shared/components/ui/image-container.component';
import { Component, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftUiComponent } from '../../shared/components/ui/gift-ui.component';
import { Gift } from '../../shared/interfaces/gift';
import { CarousolComponent } from '../../shared/components/ui/carousol.component';
import { MyTranslateService } from '../../core/services/my-translate-service.service';

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
  gifts: Gift[] = [];

  constructor(private translate: MyTranslateService) {}

   ngOnInit(): void {
    this.loadTranslations(); 
    this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
  }

  private loadTranslations(): void {
    this.translate.get([
      'Best Gifts Shop.Gifts Box',
      'Best Gifts Shop.show Now',
      'Best Gifts Shop.Awesome Gifts Box Collectons',
      'Best Gifts Shop.Occasion Gifts',
      'Best Gifts Shop.Discover Now',
      'Best Gifts Shop.Best Occasion Gifts Collections',
      'Best Gifts Shop.Combo Sets Gift Box Up To 50% Off'
    ]).subscribe(translations => {
      this.gifts = [
        {
          id: '0',
          bgImg: '/images/Confetti.png',
          title: translations['Best Gifts Shop.Gifts Box'],
          btnText: translations['Best Gifts Shop.show Now'],
          description: translations['Best Gifts Shop.Awesome Gifts Box Collectons'],
        },
        {
          id: '1',
          bgImg: '/images/holding-gift.png',
          title: translations['Best Gifts Shop.Occasion Gifts'],
          btnText: translations['Best Gifts Shop.Discover Now'],
          description: translations['Best Gifts Shop.Best Occasion Gifts Collections'],
        },
        {
          id: '2',
          bgImg: '/images/Confetti.png',
          title: translations['Best Gifts Shop.Occasion Gifts'],
          btnText: translations['Best Gifts Shop.Discover Now'],
          description: translations['Best Gifts Shop.Combo Sets Gift Box Up To 50% Off'],
        },
      ];
    });
  }
}
