import { inject } from '@angular/core';
import { ThemeService } from '../services/theme-service.service';
import { forkJoin } from 'rxjs';

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
