import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';

import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

//document.addEventListener( 'deviceready', () => {

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

//}, false );

//platformBrowserDynamic().bootstrapModule(AppModule);
