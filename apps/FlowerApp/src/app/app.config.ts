import {
  ApplicationConfig,
  importProvidersFrom,
  provideAppInitializer,
  provideZoneChangeDetection,
  isDevMode,
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
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { appInit } from './core/utills/app.utills';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideState, provideStore } from '@ngrx/store';
import { ProductsReducer } from './Store/reducers/products.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './Store/effects/products.effects';
import { environment } from '../environments/environment';
import { BASEURL } from '@rose-flower/auth-api';
import { addTokenInterceptor } from './core/interceptors/add-token.interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  cartFeatureKey,
  cartReducer,
} from './features/pages/cart/store/reducers';
import * as cartEffects from './features/pages/cart/store/effects';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { provideAnimations } from '@angular/platform-browser/animations';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    importProvidersFrom(ToastModule), // necessary
    provideAnimations(), // 👈 Required for Toast to work!

    { provide: BASEURL, useValue: environment.baseUrl },
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
    provideHttpClient(withFetch(), withInterceptors([addTokenInterceptor])),
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
      // cart:cartReducer
    }),
    provideState(cartFeatureKey, cartReducer),
    //provideStore(),
    provideEffects(cartEffects),
    provideEffects([ProductsEffects]),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      traceLimit: 75,
      trace: true,
    }),
  ],
};
