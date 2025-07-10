import { Component, forwardRef, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-global-input',
  imports: [CommonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './globalInput.component.html',
  styleUrl: './globalInput.component.scss',
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GlobalInputComponent),
      multi: true,
    },
  ],
})
export class GlobalInputComponent implements ControlValueAccessor {
  @Input({ required: true }) labelText: string = '';
  //@Input({ required: true }) formControlName: string = '';

  value: string = '';
  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};
  writeValue(value: any): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
   // throw new Error('Method not implemented.');
  }

  // Example event handler
  handleInputChange(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.onChange(newValue);
  }
}
