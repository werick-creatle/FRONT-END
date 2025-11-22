import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth.interceptor';

// --- 1. Importações para o Português ---
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

// --- 2. Registra o dicionário de português ---
registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),

    // --- 3. Define o padrão do site como PT-BR ---
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
};