import {
  Injectable,
  signal,
  Signal,
  Type,
  WritableSignal,
} from '@angular/core';
import { AddressDialogComponent } from '../components/addressDialog.component';
import { GetAddressesComponent } from '../components/getAddresses.component';

@Injectable({
  providedIn: 'root',
})
export class DialogContentService {
  selectedComponentView: WritableSignal<Type<any> | null> = signal(
    GetAddressesComponent
  );

  constructor() {}
}
