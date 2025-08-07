import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AuthRoutingModule } from './app/features/auth/auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AuthRoutingModule,
      HttpClientModule
    )
  ]
}).catch(err => console.error(err));
