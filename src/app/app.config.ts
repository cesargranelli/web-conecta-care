import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { headersInterceptor } from './auth/interceptors/headers.interceptor';
import { sizeBodyInterceptor } from './auth/interceptors/size-body.interceptor';
import { tokenInterceptor } from './auth/interceptors/token.interceptor';
import { APP_ROUTES } from './app.routes';
import { provideNgxMask } from 'ngx-mask';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      APP_ROUTES,
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),
    provideHttpClient(
      withInterceptors([tokenInterceptor, headersInterceptor, sizeBodyInterceptor]),
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: Aura, options: { darkModeSelector: false } },
    }),
    provideNgxMask(),
  ],
};
