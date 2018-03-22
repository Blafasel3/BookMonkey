import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { BookStoreService } from './shared/book-store.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { BookResolver } from './shared/book-resolver.service';

@NgModule({
  declarations: [ // all directives, components and pipes of the module
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
    { provide: LOCALE_ID, useValue: 'en' },
    BookResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
