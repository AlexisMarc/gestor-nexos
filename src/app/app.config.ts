import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { RootStore } from '@store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { EnvServiceProvider } from '../env/env-service.provider';
import { authInterceptor } from '@interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    EnvServiceProvider,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withHashLocation(),
      withComponentInputBinding()
    ),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideStore(RootStore),
    provideStoreDevtools({
      maxAge: 25,
      //logOnly: environment.production
    }), provideAnimationsAsync(),
  ],
};
