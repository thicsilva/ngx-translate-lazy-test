import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  TranslateService,
} from '@ngx-translate/core';
import {
  ApplicationInitializerFactory,
} from './translation.config';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CustomLazyLoaderModule } from './translator/custom-lazy-loader.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CustomLazyLoaderModule.forRoot([
      './assets/i18n/',
      './assets/i18n/primeng',
      './assets/i18n/shared'
    ]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ApplicationInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true,
    },
    HttpClient
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
