export interface AddToCartResponseDTO {
  message: string;
  numOfCartItems: number;
  cart: CartOrderDTO;
}

export interface CartOrderDTO {
  user: string;
  cartItems: CartItem[];
  _id: string;
  appliedCoupons?: [];
  totalPrice: number;
  discount: number;
  totalPriceAfterDiscount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface CartItem {
  product: ProductInCartDTO;
  price: number;
  quantity: number;
  _id: string;
}
export interface ProductInCartDTO {
  rateAvg: number;
  rateCount: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  isSuperAdmin: boolean;
  sold: number;
  id: string;
}
