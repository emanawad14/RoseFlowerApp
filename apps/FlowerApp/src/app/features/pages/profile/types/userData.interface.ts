import { Address } from "apps/FlowerApp/src/app/shared/interfaces/addressResponse.interface";

export interface getLoggedUserDataDTO {
  message: string;
  user: User;
}
export interface User {
  _id: string;
  firstName:string;
  lastName:string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  wishlist: [];
  addresses: Address[];
  createdAt: string;
  passwordChangedAt: string;
}
