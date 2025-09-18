import { Address, AddressResponceInterface } from 'apps/FlowerApp/src/app/shared/interfaces/addressResponse.interface';
import { ErrorResponseInterface } from 'apps/FlowerApp/src/app/shared/interfaces/errorResponce.interface';

export interface AddressStateInterface {
  isLoading: boolean;
  error: ErrorResponseInterface | null;
  data: Address[] | null|undefined;
}
