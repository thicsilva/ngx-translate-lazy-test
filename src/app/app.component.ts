import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>{{ 'HOME.TITLE' | translate }}</h2>
      <label>
        {{ 'HOME.SELECT' | translate }}
        <select #langSelect [(ngModel)]="selected" (ngModelChange)="onChange()">
          <option *ngFor="let lang of translate.getLangs()" [value]="lang" [selected]="lang === translate.currentLang">{{ lang }}</option>
        </select>
      </label>
      <p *ngFor="let value of getPrimeValues()">{{ 'primeng.'+value | translate }} </p>
      <p>{{'VIEW.CHILDFEATURE' | translate}}</p>
    </div>
    <br />
    <a routerLink="data-view">To child module</a>
    <br />
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  selected = 'pt';  

  constructor(public translate: TranslateService) {
    translate.addLangs(['pt', 'en']);    
  }

  onChange() {
    console.log(`language changed`, this.selected);    
    this.translate.use(this.selected);
  }

  getPrimeValues():string[]{
    return ['startsWith', 'contains', 'notContains']    
  }
}
