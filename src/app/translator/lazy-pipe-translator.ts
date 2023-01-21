import { PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { map, pluck } from "rxjs/operators";

export class LazyPipeTranslator implements PipeTransform {

  private translations = Observable<any>;
  constructor(private translate: TranslateService){
    const lang = this.translate.currentLang;
    this.translations= this.translate.getTranslation(lang).pipe(pluck('translations'));
  }
  transform(value: string){
    return new Observable((observer)=>{

    })
  }
}