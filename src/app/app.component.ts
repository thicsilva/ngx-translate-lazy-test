import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

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
    </div>
    <br />
    <a routerLink="data-view">To child module</a>
    <br />
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  selected = 'fr';

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    //translate.setDefaultLang('en');

    //const browserLang = translate.getBrowserLang();
    //translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  onChange() {
    console.log(`language changed`, this.selected);
    this.translate.use(this.selected)
  }
}
