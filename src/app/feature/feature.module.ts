import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslateService, TranslateStore, LangChangeEvent } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { DataViewComponent } from './data-view/data-view.component';
import { FeatureRoutingModule } from './feature-routin.module';
import { SharedModule } from '../shared/shared.module';

export function createTranslateLoader(http: HttpClient) {
  console.log('FeatureModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/feature/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FeatureRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [DataViewComponent],
  providers: [],
  exports: []
})
export class FeatureModule {
  constructor(public translationService: TranslateService) {

		this.translationService.store.onLangChange
      .subscribe((lang: LangChangeEvent) => {
        console.log(' ==> FeatureModule ', lang);
        this.translationService.use(lang.lang);
      });
	}
}