import { inject } from '@angular/core';
import { ThemeService } from '../services/theme-service.service';
import { forkJoin } from 'rxjs';

export const appInit = () => {
  const themeManager = inject(ThemeService);
  return forkJoin([themeManager.initialTheme()]);

  // return themeManager.forkJoin.initialTheme();
};
