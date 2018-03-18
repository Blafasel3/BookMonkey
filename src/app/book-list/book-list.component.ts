import { BookStoreService } from './../shared/book-store.service';
import { Book, Thumbnail } from '../shared/book';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {

  books: Book[];

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
    this.bs.getAll().subscribe(response => this.books = response);
  }

}
