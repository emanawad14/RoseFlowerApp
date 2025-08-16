import { Component, Type, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAddressComponent } from './addAddress.component';
import { GetAddressesComponent } from './getAddresses.component';
 import { Store } from '@ngrx/store';
import { selectCurrentDialogView } from '../store/reducers';
import { map, Observable } from 'rxjs';
import { DialogViewEnum, ViewDialogState } from '../types/viewDialogType.enum';

@Component({
  selector: 'app-address-dialog',
  imports: [CommonModule],
  templateUrl: './addressDialog.component.html',
  styleUrl: './addressDialog.component.scss',
})
export class AddressDialogComponent {
  currentComponent$: Observable<Type<any> | null>;
  dialogViewMap: Record<DialogViewEnum, Type<any>> = {
    [DialogViewEnum.addAddress]: AddAddressComponent,
    [DialogViewEnum.getAddresses]: GetAddressesComponent,
  };
  constructor(private store: Store) {
    this.currentComponent$ = this.store.select(selectCurrentDialogView).pipe(
      map((state: ViewDialogState) => {
        return this.dialogViewMap[state.currentView] || null;
      })
    );
  }
}
