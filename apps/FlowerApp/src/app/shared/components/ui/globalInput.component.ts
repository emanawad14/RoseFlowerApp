import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Country } from '../../interfaces/country.interface';
import { SelectModule } from 'primeng/select';
import { ProfileService } from '../../../features/pages/profile/services/profile.service';

@Component({
  selector: 'app-global-input',
  templateUrl: './globalInput.component.html',
  styleUrls: ['./globalInput.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, SelectModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GlobalInputComponent),
      multi: true,
    },
  ],
  standalone: true,
})
export class GlobalInputComponent implements ControlValueAccessor {
  countries: Country[] = ProfileService.countries;

  @Input() id = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() labelText = '';
  @Input() search = false;
  //isPasswordVisible = false;
  @Input() value = '';
  @Input() isPhone: boolean = false;
  // @Input() formControlName: string = '';

  @Input() isDisabled = false;
  @Input() selectedCountry: Country = this.countries[0];
  // @Input() phoneNumber: string = '';
  onChange = (val: string) => void 0;
  onTouched = () => void 0;

  writeValue(value: any): void {
    this.value = value ?? '';
    if (this.isPhone && value) {
      // this.selectedCountry = value.country || this.countries[0];
      // this.phoneNumber = value.phone || '';
      // this.value = `+${this.selectedCountry.dial}${this.phoneNumber}`;
      this.value = value.replace(`+${this.selectedCountry.dial}`, '');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleInput(event: any): void {
    if (this.isPhone) {
      // Case: dropdown changed
      if (event?.value && event.originalEvent) {
        this.selectedCountry = event.value;
        this.onChange(`+${this.selectedCountry.dial}${this.value}`);
      }
      // Case: user typed in phone input
      else if (event?.target) {
        this.value = (event.target as HTMLInputElement).value;
        this.onChange(`+${this.selectedCountry.dial}${this.value}`);
      }
    } else {
      const inputValue = (event.target as HTMLInputElement).value;
      this.value = inputValue;
      this.onChange(inputValue);
    }
  }

  // togglePassword() {
  //   this.isPasswordVisible = !this.isPasswordVisible;
  // }
}
