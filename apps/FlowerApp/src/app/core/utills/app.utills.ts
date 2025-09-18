import { inject } from '@angular/core';
import { ThemeService } from '../services/theme-service.service';
import { forkJoin } from 'rxjs';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export const appInit = () => {
  const themeManager = inject(ThemeService);
  return forkJoin([themeManager.initialTheme()]);

  // return themeManager.forkJoin.initialTheme();
};
export function removeUnWantedProperties<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const clone = { ...obj };
  keys.forEach((key) => delete clone[key]);
  return clone;
}

export function getCountryCode(phone: string): string | null {
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber ? phoneNumber.countryCallingCode : null;
}
export function getLocalNumber(phone: string): string | null {
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber ? phoneNumber.nationalNumber : null;
}

export function internationalPhoneValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value) return null;
  const phoneNumber = parsePhoneNumberFromString(control.value);
  return phoneNumber && phoneNumber.isValid() ? null : { invalidPhone: true };
}
