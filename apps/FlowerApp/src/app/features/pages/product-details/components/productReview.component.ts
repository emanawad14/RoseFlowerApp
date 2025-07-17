import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { GlobalInputComponent } from 'apps/FlowerApp/src/app/shared/components/ui/globalInput.component';
import { PrimaryBtnComponent } from 'apps/FlowerApp/src/app/shared/components/ui/primary-btn.component';
import { Review } from '../interfaces/review.interface';

@Component({
  selector: 'app-product-review',
  imports: [
    CommonModule,
    Rating,
    FormsModule,
    GlobalInputComponent,
    PrimaryBtnComponent,
  ],
  templateUrl: './productReview.component.html',
  styleUrl: './productReview.component.scss',
})
export class ProductReviewComponent {
  reviews: Review[] = [
    {
      _id: '1',
      userName: 'Ahmed',
      title: 'Awesome Bouquet!',
      description:
        'I ordered this bouquet for a special occasion, and it absolutely exceeded my expectations! The flowers were fresh, beautifully arranged, and exactly as pictured—if not better. The color combination was stunning and gave off such a luxurious vibe. Even the wrapping was elegant and ' +
        "thoughtful Delivery was right on time, and the bouquet arrived in perfect condition. The recipient was genuinely touched and couldn't stop admiring it. Highly recommend for anyone looking to make a lasting impression. Will definitely order again!",

      rateAvg: '5',
      date: '2025-07-05T11:30:17.866Z',
    },
    {
      _id: '1',
      userName: 'Ahmed',
      title: 'Awesome Bouquet!',
      description:
        'I ordered this bouquet for a special occasion, and it absolutely exceeded my expectations! The flowers were fresh, beautifully arranged, and exactly as pictured—if not better. The color combination was stunning and gave off such a luxurious vibe. Even the wrapping was elegant and ' +
        "thoughtful Delivery was right on time, and the bouquet arrived in perfect condition. The recipient was genuinely touched and couldn't stop admiring it. Highly recommend for anyone looking to make a lasting impression. Will definitely order again!",

      rateAvg: '3',
      date: 'Apr 7, 2025',
    },
  ];
}
