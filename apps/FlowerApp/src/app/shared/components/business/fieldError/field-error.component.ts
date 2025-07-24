import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { ErrorComponent } from '../../ui/error/error.component';

@Component({
  selector: 'app-field-error',
  imports: [CommonModule, ErrorComponent],
  templateUrl: './field-error.component.html',
  styleUrl: './field-error.component.scss',
})
export class FieldErrorComponent {
  @Input({ required: true }) control!: AbstractControl | null;
  @Input({ required: true }) fieldName: string = '';

  get errorMessages(): string[] {
    if (!this.control || !this.control.errors) return [];

    const messages: string[] = [];
    const name = this.fieldName.toLowerCase();

    const errors = this.control.errors;

    if (errors['required']) messages.push(`${name} is required`);
    if (errors['email']) messages.push(`Please enter a valid ${name}`);
    if (errors['minlength'])
      messages.push(
        `${name} must be at least ${errors['minlength'].requiredLength} characters`
      );
    if (errors['maxlength'])
      messages.push(
        `${name} must be no more than ${errors['maxlength'].requiredLength} characters`
      );

    if (errors['pattern']) {
      if (name == 'password') {
        messages.push(
          `Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.`
        );
      } else messages.push(`Invalid ${name} format`);
    }

    return messages;
  }
}
