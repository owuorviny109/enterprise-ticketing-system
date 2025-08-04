import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
<<<<<<< HEAD
import { App } from './app/app';

bootstrapApplication(App, appConfig)
=======
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
>>>>>>> c94db1d03ee9a10abd1b90f9c2d7638d627eab39
  .catch((err) => console.error(err));
