import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-global-input',
  imports: [CommonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './globalInput.component.html',
  styleUrl: './globalInput.component.scss',
})
export class GlobalInputComponent {
  @Input({ required: true }) labelText: string = '';
  //@Input({ required: true }) formControlName: string = '';
}
