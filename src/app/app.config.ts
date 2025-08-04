import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
<<<<<<< HEAD
=======
import { provideHttpClient } from '@angular/common/http';
>>>>>>> c94db1d03ee9a10abd1b90f9c2d7638d627eab39

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
<<<<<<< HEAD
    provideRouter(routes)
=======
    provideRouter(routes),
    provideHttpClient()
>>>>>>> c94db1d03ee9a10abd1b90f9c2d7638d627eab39
  ]
};
