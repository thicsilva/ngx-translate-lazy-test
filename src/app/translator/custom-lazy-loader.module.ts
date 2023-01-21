import { HttpBackend } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateModuleConfig,
} from '@ngx-translate/core';
import { CustomLazyLoader } from './custom-lazy-loader';
import { CustomMissingTranslationHandler } from './custom-missing-translation-handler';

export function loaderFactory(
  resources: string[] 
): (http: HttpBackend) => TranslateLoader {
  return (http: HttpBackend) => {
    console.log(resources);
    return new CustomLazyLoader(http, resources)
  };
}

export function translateConfig(
  resources: string[] 
): TranslateModuleConfig {
  return {
    useDefaultLang: false,
    loader: {
      provide: TranslateLoader,
      useFactory: loaderFactory(resources),
      deps: [HttpBackend],
    }
  };
}

@NgModule()
export class CustomLazyLoaderModule {
  static forRoot(
    resources: string[],
    config?: TranslateModuleConfig
  ): ModuleWithProviders<TranslateModule> {
    return TranslateModule.forRoot({
      ...translateConfig(resources),
      ...config,
      isolate: false,
    });
  }
  static forChild(
    resources: string[],
    config?: TranslateModuleConfig
  ): ModuleWithProviders<TranslateModule> {
    return TranslateModule.forChild({
      ...translateConfig(resources),
      extend: true,
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: CustomMissingTranslationHandler,
      },
      ...config,
    });
  }
}
