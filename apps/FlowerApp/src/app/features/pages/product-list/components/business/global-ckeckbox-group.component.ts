import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CheckboxOption } from '../../interfaces/checbox-options';

@Component({
  selector: 'app-global-ckeckbox-group',
  imports: [
    CommonModule,
    CheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    RatingModule,
  ],
  templateUrl: './global-ckeckbox-group.component.html',
  styleUrl: './global-ckeckbox-group.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GlobalCkeckboxGroupComponent),
      multi: true,
    },
  ],
})
export class GlobalCkeckboxGroupComponent implements ControlValueAccessor {
  selectedValues: any[] = [];
  // ControlValueAccessor implementation
  private onChange: any = () => {};
  private onTouched: any = () => {};

  // ControlValueAccessor methods
  writeValue(value: any[]): void {
    if (value) {
      this.selectedValues = value;
    } else {
      this.selectedValues = [];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    //this.disabled = isDisabled;
  }
  @Input() options: CheckboxOption[] = [];
  @Input() inputRatings: boolean = false;
  @Input() groupTitle: string = '';

  // Handle checkbox change events
  onCheckboxChange(event: any, option: CheckboxOption): void {
    if (event.checked) {
      if (!this.selectedValues.includes(option.value)) {
        this.selectedValues.push(option.value);
      }
    } else {
      const index = this.selectedValues.indexOf(option.value);
      if (index !== -1) {
        this.selectedValues.splice(index, 1);
      }
    }

    this.onChange(this.selectedValues);
    this.onTouched();
  }
}
