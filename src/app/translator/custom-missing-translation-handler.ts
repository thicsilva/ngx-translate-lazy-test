import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, take, shareReplay } from 'rxjs/operators';

export class CustomMissingTranslationHandler extends MissingTranslationHandler {
  private translatesLoading: { [lang: string]: Observable<object> } = {};

  handle(params: MissingTranslationHandlerParams) {
    const service = params.translateService;
    const lang = service.currentLang || service.defaultLang;

    if (!this.translatesLoading[lang]) {
      // we request translations loading via loader (the very same, which was implemented above)
      this.translatesLoading[lang] = service.currentLoader
        .getTranslation(lang)
        .pipe(
          // add translations to the common ngx-translate storage
          // the true flag indicates that the objects need to be merged
          tap((t) => service.setTranslation(lang, t, true)),
          map(() => service.translations[lang]),
          shareReplay(1),
          take(1)
        );
    }
    return this.translatesLoading[lang].pipe(
      // we pull the necessary translation by its key and insert parameters in it
      map((t) =>
        service.parser.interpolate(
          service.parser.getValue(t, params.key),
          params.interpolateParams
        )
      ),
      // in case of error we emulate standard behavior, in case of no translation - we return the key
      catchError(() => of(params.key))
    );
  }
}
