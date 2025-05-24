import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Catigory } from '../../../../features/interfaces/catigory.FlowerApp';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-catigory',
  imports: [CommonModule, Carousel, ButtonModule, CardModule],
  templateUrl: './catigory.component.html',
  styleUrl: './catigory.component.css',
})
export class CatigoryComponent {
  @Input() categories!: Catigory[];
  products: Catigory[] = [];
  constructor() {
    this.products = this.categories;
  }

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 5,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
