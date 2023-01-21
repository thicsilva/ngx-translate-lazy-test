import { HttpBackend, HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import deepmerge from 'deepmerge';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ITranslationResource {
  prefix: string;
  suffix?: string;
  optional?: boolean;
}

export class CustomLazyLoader implements TranslateLoader {
  constructor(
    private _handler: HttpBackend,
    private _resourcesPrefix: string[] | ITranslationResource[]
  ) {}
  getTranslation(lang: string): Observable<any> {
    const requests: Observable<Object | {}>[] = this._resourcesPrefix.map(
      (resource) => {
        let path: string;
        if (resource.prefix)
          path = `${resource.prefix}${lang}${resource.suffix || '.json'}`;
        else path = `${resource}${lang}.json`;

        return new HttpClient(this._handler).get(path).pipe(
          catchError((res) => {
            if (!resource.optional) {
              console.group();
              console.error(
                'Something went wrong for the following translation file:',
                path
              );
              console.error(res.message);
              console.groupEnd();
            }
            return of({});
          })
        );
      }
    );
    return forkJoin(requests).pipe(map((response) => deepmerge(response, [])));
  }
}
