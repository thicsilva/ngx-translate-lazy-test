import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedViewComponent } from './shared-view/shared-view.component';
import { TranslateModule, TranslateService, LangChangeEvent } from '@ngx-translate/core';

const COMPONENTS = [SharedViewComponent];
const SHARED_MODULES = [
  CommonModule
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...SHARED_MODULES,
    TranslateModule.forChild()
  ],
  exports: [
    ...SHARED_MODULES,
    TranslateModule,
    ...COMPONENTS
  ],
  providers: []
})
export class SharedModule {
  constructor(public translationService: TranslateService) {

		this.translationService.store.onLangChange
      .subscribe((lang: LangChangeEvent) => {
        console.log(' ==> FeatureModule ', lang);
        this.translationService.use(lang.lang);
      });
	}
}