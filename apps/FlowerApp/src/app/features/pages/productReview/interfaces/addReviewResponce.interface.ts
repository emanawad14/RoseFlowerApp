export interface AddReviewResponseDTO {
  message: string;
  review: {
    product: string;
    user: string;
    rating: number;
    title: string;
    comment: string;
    status: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
}
