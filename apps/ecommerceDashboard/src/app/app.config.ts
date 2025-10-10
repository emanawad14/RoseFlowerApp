import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
// import { NgxSpinnerModule } from "ngx-spinner";

import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [

    provideZoneChangeDetection({ eventCoalescing: true }),
   
    
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })),
    provideHttpClient(withFetch(),withInterceptors([])) ,
    // importProvidersFrom(NgxSpinnerModule)
  ],
};
