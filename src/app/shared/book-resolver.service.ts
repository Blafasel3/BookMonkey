import { BookStoreService } from './book-store.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Book } from './book';

@Injectable()
export class BookResolver implements Resolve<Book> {


  constructor(
    private bookStoreService: BookStoreService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    return this.bookStoreService.getBook(route.params['isbn']);
  }

}
