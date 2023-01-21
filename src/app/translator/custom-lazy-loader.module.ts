import { HttpBackend } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateModuleConfig,
} from '@ngx-translate/core';
import { CustomLazyLoader, ITranslationResource } from './custom-lazy-loader';
import { CustomMissingTranslationHandler } from './custom-missing-translation-handler';

export function loaderFactory(
  resources: string[] | ITranslationResource[]
): (http: HttpBackend) => TranslateLoader {
  return (http: HttpBackend) => new CustomLazyLoader(http, resources);
}

export function translateConfig(
  resources: string[] | ITranslationResource[]
): TranslateModuleConfig {
  return {
    useDefaultLang: false,
    loader: {
      provide: TranslateLoader,
      useFactory: loaderFactory(resources),
      deps: [HttpBackend],
    },
  };
}

@NgModule()
export class CustomLazyLoaderModule {
  static forRoot(
    resources: string[] | ITranslationResource[],
    config?: TranslateModuleConfig
  ): ModuleWithProviders<TranslateModule> {
    return TranslateModule.forRoot({
      ...translateConfig(resources),
      ...config,
    });
  }
  static forChild(
    resources: string[] | ITranslationResource[],
    config?: TranslateModuleConfig
  ): ModuleWithProviders<TranslateModule> {
    return TranslateModule.forChild({
      ...translateConfig(resources),
      extend: true,
      // missingTranslationHandler: {
      //   provide: MissingTranslationHandler,
      //   useClass: CustomMissingTranslationHandler,
      // },
      ...config,
    });
  }
}
