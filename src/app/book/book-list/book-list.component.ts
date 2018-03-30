import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BookStoreService } from '../../shared/book-store.service';
import { Book, Thumbnail } from '../../shared/book';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {

  loading = true;

  books$: Observable<Book[]>;

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
    this.books$ = this.bs.getAll();
    this.loading = false;
  }

}
