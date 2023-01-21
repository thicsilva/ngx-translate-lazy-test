import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shared-view',
  templateUrl: './shared-view.component.html',
  styleUrls: ['./shared-view.component.css']
})
export class SharedViewComponent  implements OnInit {

  constructor(private readonly translate: TranslateService) {
  }

  ngOnInit() {
    this.translate.use(this.translate.store.currentLang);
  }
}