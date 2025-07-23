import {
  Component,
  forwardRef,
  Input
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-global-input',
  templateUrl: './globalInput.component.html',
  styleUrls: ['./globalInput.component.scss'],
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
  @Input() id = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() labelText = '';

  value = '';
  isDisabled = false;

  onChange = (val: string) => void 0;
  onTouched = () => void 0;;

  writeValue(value: any): void {
    this.value = value ?? '';
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

  handleInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);
  }
}
