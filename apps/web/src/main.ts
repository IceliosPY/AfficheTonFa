import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { AppComponent } from './app/app.component';
import { EmbedComponent } from './app/embed.component';
import { RootComponent } from './app/root.component';

bootstrapApplication(RootComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: AppComponent },
      { path: 'embed/:graphId', component: EmbedComponent },
      { path: '**', redirectTo: '' },
    ], withHashLocation()),
  ],
}).catch((error: unknown) => console.error(error));
