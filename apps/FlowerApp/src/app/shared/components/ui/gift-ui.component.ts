import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnComponent } from './primary-btn.component';
import { Gift } from '../../interfaces/gift';

@Component({
  selector: 'app-gift-ui',
  imports: [CommonModule, PrimaryBtnComponent],
  templateUrl: './gift-ui.component.html',
  styleUrl: './gift-ui.component.scss',
})
export class GiftUiComponent {
  @Input() gift!: Gift;
  labelName = signal('Shop Now');
  displayIcon = signal(false);
}
