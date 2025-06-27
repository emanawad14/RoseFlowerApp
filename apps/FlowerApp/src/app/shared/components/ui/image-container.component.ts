import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnComponent } from './primary-btn.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-image-container',
  imports: [CommonModule,PrimaryBtnComponent,TranslatePipe],
  templateUrl: './image-container.component.html',
  styleUrl: './image-container.component.scss',
})
export class ImageContainerComponent {

    labelName = 'Shop Now';
}
