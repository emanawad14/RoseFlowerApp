import { inject } from '@angular/core';
import { ThemeService } from '../services/theme-service.service';

export const appInit = () => {
  const themeManager = inject(ThemeService);
  return themeManager.initialTheme();
};
