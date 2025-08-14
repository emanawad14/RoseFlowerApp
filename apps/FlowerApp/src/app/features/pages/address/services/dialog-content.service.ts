import { Injectable, signal, Type, WritableSignal } from '@angular/core';
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
