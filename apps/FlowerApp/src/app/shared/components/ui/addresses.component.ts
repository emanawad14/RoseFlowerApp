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
  // selectedAddress: Address | null;
 // @Output() changeAddress = new EventEmitter<Address>();
  constructor(public _AddressService: AddressService) {
    //this.selectedAddress.set('Updated by parent') = this._AddressService.selectedAddress.;
  }
  // selectedAddress: Address | null = null;
  selectAddress(address: Address) {
    //  console.log(address);
    this._AddressService.selectedAddress.set(address as Address);

    // this.selectedAddress = address;
   // this.changeAddress.emit(address);
  }
}
