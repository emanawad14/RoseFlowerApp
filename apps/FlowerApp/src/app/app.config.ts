import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ThemeService } from './core/services/theme-service.service';
import { CookieService } from 'ngx-cookie-service';
import { CookiesService } from './core/services/cookies.service';
 
export const appConfig: ApplicationConfig = {
  providers: [
    CookieService,
    provideAppInitializer(() => {
      const _themeService = inject(ThemeService);
      const _CookiesService = inject(CookiesService);
      // _themeService.initialTheme();
      return _themeService.initialTheme(_CookiesService.getFromCookies('app-theme'));
      // return Promise.resolve();
    }),
    
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
          darkTheme: false,
        },
      },
    }),
  ],
};
