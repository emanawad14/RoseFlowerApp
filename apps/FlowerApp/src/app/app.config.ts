import {
  ApplicationConfig,
  importProvidersFrom,
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
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { appInit } from './core/utills/app.utills';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngrx/store';
import { ProductsReducer } from './Store/reducers/products.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './Store/effects/products.effects';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => appInit()),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),

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
    provideStore({
      Products: ProductsReducer,
    }),
    provideEffects([ProductsEffects]),
  ],
};
