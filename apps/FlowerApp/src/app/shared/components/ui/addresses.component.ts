import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Address } from '../../interfaces/addressResponse.interface';
import { AddressService } from '../../../features/pages/cart/services/address.service';

@Component({
  selector: 'app-addresses',
  imports: [CommonModule],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss',
})
export class AddressesComponent {
  @Input({ required: true }) addresses?: Address[];
  // @Input({ required: true }) selectedAddress: Address | null = null;
  selectedAddress;
  @Output() changeAddress = new EventEmitter<Address>();
  constructor(private _AddressService: AddressService) {
    this.selectedAddress = this._AddressService.selectedAddress;
  }
  // selectedAddress: Address | null = null;
  selectAddress(address: Address) {
    //  console.log(address);
    this._AddressService.selectedAddress = address;
    this.selectedAddress = address;
    this.changeAddress.emit(address);
  }
}
