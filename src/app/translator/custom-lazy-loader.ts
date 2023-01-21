import { HttpBackend, HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export class CustomLazyLoader implements TranslateLoader {
  constructor(
    private _handler: HttpBackend,
    private _resourcesPrefix: string[]
  ) { }
  getTranslation(lang: string): Observable<any> {
    const requests: Observable<Object | {}>[] = this._resourcesPrefix.map(
      (resource) => {
        const separator = resource.charAt(resource.length-1)==='/' ? '' : '/';
        const path = `${resource}${separator}${lang}.json`;
        return new HttpClient(this._handler).get(path).pipe(
          catchError(() => {
            return of({});
          })
        );
      }
    );
    const fork = forkJoin(requests).pipe(
      map((response) => {
        const flatted = response.reduce((acc, key) => this.mergeDeep(acc, key), {});        
        return flatted;
      }));
    return fork;
  }

  mergeDeep(target: any, source: any): any {
    let output = Object.assign({}, target);
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach((key: any) => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, {[key]: source[key]});
          } else {
            output[key] = this.mergeDeep(target[key], source[key]);
          }
        } else {
          Object.assign(output, {[key]: source[key]});
        }
      });
    }
    return output;
  }
  isObject(item: any): boolean {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }
}
