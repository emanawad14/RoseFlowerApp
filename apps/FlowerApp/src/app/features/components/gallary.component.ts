import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface GalleryImage {
  src: string;
  alt?: string;
  /** image width */
  spanUnit: 1 | 2;
}
@Component({
  selector: 'app-gallary',
  imports: [CommonModule],
  templateUrl: './gallary.component.html',
  styleUrl: './gallary.component.scss',
})
export class GallaryComponent {
  images: GalleryImage[] = [
    { src: '/images/gallary-1.png', alt: 'Gift 1', spanUnit: 1 },
    { src: '/images/gallary-2.png', alt: 'Gift 2', spanUnit: 1 },
    { src: '/images/gallary-3.png', alt: 'Gift 3', spanUnit: 1 },
    { src: '/images/gallary-4.png', alt: 'Gift 4', spanUnit: 2 },
    { src: '/images/gallary-5.png', alt: 'Gift 5', spanUnit: 1 },
  ];
}
