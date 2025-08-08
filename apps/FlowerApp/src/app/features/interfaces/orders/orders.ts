
 export interface Orders {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  totalPrice: number;
  paymentType: string;
  isPaid: boolean;
  isDelivered: boolean;
  state: string;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
  __v: number;
}

interface OrderItem {
  product: Product;
  price: number;
  quantity: number;
  _id: string;
}

interface Product {
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
  __v: number;
  isSuperAdmin: boolean;
  sold: number;
  id: string;
}