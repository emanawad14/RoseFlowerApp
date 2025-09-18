export interface PaymentMethod {
  _id: string;
  imgSrc: string;
  title: string;
  description: string;
  type: PaymentMethodEnum;
}
// Enum for allowed payment methods
export enum PaymentMethodEnum {
  Cash = 'CASH',
  Credit = 'CREDIT',
}
