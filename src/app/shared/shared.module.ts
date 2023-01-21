import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedViewComponent } from './shared-view/shared-view.component';
import {
  TranslateModule,
  TranslateService,
  LangChangeEvent,
} from '@ngx-translate/core';

const COMPONENTS = [SharedViewComponent];
const SHARED_MODULES = [CommonModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...SHARED_MODULES, TranslateModule],
  exports: [...SHARED_MODULES, TranslateModule, ...COMPONENTS],
  providers: [],
})
export class SharedModule {

}
