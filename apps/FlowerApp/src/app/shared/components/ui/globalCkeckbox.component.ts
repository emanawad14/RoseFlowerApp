import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-global-ckeckbox',
  imports: [CommonModule, CheckboxModule, ReactiveFormsModule, FormsModule],
  templateUrl: './globalCkeckbox.component.html',
  styleUrl: './globalCkeckbox.component.scss',
})
export class GlobalCkeckboxComponent {
  @Input() labelText: string = '';
  @Output() checkboxSelected = new EventEmitter<string>();
  // selectedSizes: string[] = [];
  onchanged(event: CheckboxChangeEvent) {
    if (event.checked) {
      console.log('Selected event', event.checked);
      this.checkboxSelected.emit(event.checked);
    }
  }
}
