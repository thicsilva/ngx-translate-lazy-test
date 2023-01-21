import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export function ApplicationInitializerFactory(
  translate: TranslateService,
  injector: Injector
) {
  return async () => {
    await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

    const deaultLang = 'pt';
    translate.addLangs(['pt', 'en']);
    translate.setDefaultLang(deaultLang);
    try {
      translate.use(deaultLang);
    } catch (err) {
      console.log(err);
    }
    console.log(`Successfully initialized ${deaultLang} language.`);
  };
}
