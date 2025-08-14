import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rating } from 'primeng/rating';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GlobalInputComponent } from 'apps/FlowerApp/src/app/shared/components/ui/globalInput.component';
import { PrimaryBtnComponent } from 'apps/FlowerApp/src/app/shared/components/ui/primary-btn.component';
import { Review } from '../../product-details/interfaces/review.interface';
import { Product } from '../../../interfaces/products';
import { ReviewService } from '../services/review.service';
import { ToastService } from 'apps/FlowerApp/src/app/shared/services/toast.service';
import { LoadingComponent } from 'apps/FlowerApp/src/app/shared/components/ui/loading.component';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'apps/FlowerApp/src/app/shared/services/auth.service';

@Component({
  selector: 'app-product-review',
  imports: [
    CommonModule,
    Rating,
    FormsModule,
    GlobalInputComponent,
    PrimaryBtnComponent,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './productReview.component.html',
  styleUrl: './productReview.component.scss',
})
export class ProductReviewComponent implements OnInit, OnDestroy {
  @Input({ required: true }) product?: Product;
  reviewForm!: FormGroup; // FormGroup defined
  private destroy$ = new Subject<void>();
  isLoggedIn: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _ReviewService: ReviewService,
    private _toastService: ToastService,
    private _AuthService: AuthService
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.reviewForm = this._fb.group({
      product: [''],
      rating: [0, [Validators.required]],
      title: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
    this.isLoggedIn = !!this._AuthService.userData();
  }
  reviews: Review[] = [
    {
      _id: '1',
      userName: 'Ahmed',
      title: 'Awesome Bouquet!',
      description:
        'I ordered this bouquet for a special occasion, and it absolutely exceeded my expectations! The flowers were fresh, beautifully arranged, and exactly as pictured—if not better. The color combination was stunning and gave off such a luxurious vibe. Even the wrapping was elegant and ' +
        "thoughtful Delivery was right on time, and the bouquet arrived in perfect condition. The recipient was genuinely touched and couldn't stop admiring it. Highly recommend for anyone looking to make a lasting impression. Will definitely order again!",

      rateAvg: 4.5,
      date: '2025-07-05T11:30:17.866Z',
    },
    {
      _id: '2',
      userName: 'Ahmed',
      title: 'Awesome Bouquet!',
      description:
        'I ordered this bouquet for a special occasion, and it absolutely exceeded my expectations! The flowers were fresh, beautifully arranged, and exactly as pictured—if not better. The color combination was stunning and gave off such a luxurious vibe. Even the wrapping was elegant and ' +
        "thoughtful Delivery was right on time, and the bouquet arrived in perfect condition. The recipient was genuinely touched and couldn't stop admiring it. Highly recommend for anyone looking to make a lasting impression. Will definitely order again!",

      rateAvg: 3.2,
      date: 'Apr 7, 2025',
    },
  ];

  addReview() {
    //////set product id /////
    this.reviewForm.controls['product'].setValue(this.product?._id ?? '');
    console.log(this.reviewForm.value);
    this._ReviewService
      .addReview(this.reviewForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.reviewForm.reset();
        },
        error: (err) => {
          this._toastService.showError(err.error.error);
          this.reviewForm.reset();
        },
      });
  }
}
