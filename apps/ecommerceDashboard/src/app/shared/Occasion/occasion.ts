 export interface IOccasion {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
}

export interface OccasionResponse {
  message: string;
  metadata: [];
  categories: IOccasion[];
}
