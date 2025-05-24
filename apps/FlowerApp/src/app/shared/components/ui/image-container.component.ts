import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnComponent } from './primary-btn.component';

@Component({
  selector: 'app-image-container',
  imports: [CommonModule,PrimaryBtnComponent],
  templateUrl: './image-container.component.html',
  styleUrl: './image-container.component.scss',
})
export class ImageContainerComponent {

    labelName = 'Shop Now';
}
