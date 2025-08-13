export interface AddressResponceInterface {
  message: string;
  addresses: Address[];
  address?:Address[]
}
export interface Address {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
  _id: string;
}
