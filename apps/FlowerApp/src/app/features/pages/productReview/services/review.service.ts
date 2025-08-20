import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddReviewRequestInterface } from '../interfaces/addReviewRequest.interface';
import { environment } from 'apps/FlowerApp/src/environments/environment';
import { AddReviewResponseDTO } from '../interfaces/addReviewResponce.interface';
import { Observable } from 'rxjs';
import { Review } from '../../product-details/interfaces/review.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private _http: HttpClient) {}
  addReview(
    review: AddReviewRequestInterface
  ): Observable<AddReviewResponseDTO> {
    const url = `${environment.baseUrl}/api/v1/reviews`;
    return this._http.post<AddReviewResponseDTO>(url, review);
  }

  getReviews(): Observable<Review[]> {
    return this._http.get<Review[]>('/data/reviews.json'); // file inside public/data
  }
}
