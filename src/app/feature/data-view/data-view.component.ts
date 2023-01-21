import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {

  constructor(private readonly translate: TranslateService) {
  }

  ngOnInit() {
    this.translate.use(this.translate.store.currentLang);
  }
}