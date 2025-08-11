export interface CreateOrderRequestInterface {
  shippingAddress: ShippingAddress;
}
export interface ShippingAddress {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
}
