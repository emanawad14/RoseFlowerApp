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
    private _reviewService: ReviewService,
    private _toastService: ToastService,
    private _authService: AuthService
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
    this.isLoggedIn = !!this._authService.userData();

    this.getProductReview();
  }
  reviews: Review[] = [];

  addReview() {
    //////set product id /////
    this.reviewForm.controls['product'].setValue(this.product?._id ?? '');
    console.log(this.reviewForm.value);
    this._reviewService
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

  getProductReview() {
    this._reviewService.getReviews().subscribe((data) => {
      this.reviews = data;
    });
  }
}
