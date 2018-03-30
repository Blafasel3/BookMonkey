import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData, DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { BookStoreService } from './shared/book-store.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { BookResolver } from './shared/book-resolver.service';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [ // all directives, components and pipes defined by the module
    AppComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [ // external dependencies
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [ // injectable via DI
    BookStoreService,
    { provide: LOCALE_ID, useValue: 'de' },
    BookResolver
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
