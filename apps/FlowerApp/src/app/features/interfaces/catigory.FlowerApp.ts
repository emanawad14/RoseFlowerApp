export interface Catigory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  productsCount: number;
}
export interface CatigoryResponse {
  message: string;
  metadata: [];
  categories: Catigory[];
}
