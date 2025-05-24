import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialGiftsComponent } from '../../components/special-gifts.component';
import { FeaturesComponent } from '../../components/features.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule,SpecialGiftsComponent,FeaturesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
