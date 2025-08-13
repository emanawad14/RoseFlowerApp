import { Component, Type, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAddressComponent } from './addAddress.component';
import { GetAddressesComponent } from './getAddresses.component';
import { DialogContentService } from '../services/dialog-content.service';

@Component({
  selector: 'app-address-dialog',
  imports: [CommonModule],
  templateUrl: './addressDialog.component.html',
  styleUrl: './addressDialog.component.scss',
})
export class AddressDialogComponent {
  currentComponent: WritableSignal<Type<any> | null>;
  constructor(private _DialogContentService: DialogContentService) {
    this.currentComponent = this._DialogContentService.selectedComponentView;
  }
}
