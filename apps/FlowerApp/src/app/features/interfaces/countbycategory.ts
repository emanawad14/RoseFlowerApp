export interface Countbycategory {
  _id: string;
  productCount: number;
  category: string;
}
export interface CountbycategoryResponse {
  categoryProductCount: Countbycategory[];
}
