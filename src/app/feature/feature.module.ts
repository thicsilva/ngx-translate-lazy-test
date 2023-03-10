import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { DataViewComponent } from './data-view/data-view.component';
import { FeatureRoutingModule } from './feature-routin.module';
import { SharedModule } from '../shared/shared.module';
import { CustomLazyLoaderModule } from '../translator/custom-lazy-loader.module';

export function createTranslateLoader(http: HttpClient) {
  console.log('FeatureModule createTranslateLoader');
  return new TranslateHttpLoader(http, './assets/i18n/feature/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FeatureRoutingModule,
    CustomLazyLoaderModule.forChild(['./assets/i18n/feature/']),
  ],
  declarations: [DataViewComponent],
  providers: [],
  exports: [],
})
export class FeatureModule {
}
