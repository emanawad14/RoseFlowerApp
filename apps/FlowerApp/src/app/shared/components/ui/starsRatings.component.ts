import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stars-ratings',
  imports: [CommonModule],
  templateUrl: './starsRatings.component.html',
  styleUrl: './starsRatings.component.scss',
})
export class StarsRatingsComponent {
  @Input() starsRatting: number = 5;
}
