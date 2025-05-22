import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          ripple: true,
          inputStyle: 'filled',
          darkTheme: false,
          zIndex: {
            modal: 1000,
            overlay: 1000,
            menu: 1000,
            tooltip: 1100,
            toast: 1200,
            blockUI: 1000,
            sidebar: 1000,
            contextMenu: 1000,
          },
        },
      },
    }),
    provideHttpClient(withFetch()),
  ],
};
