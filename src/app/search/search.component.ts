import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { Book } from '../shared/book';
import { BookStoreService } from './../shared/book-store.service';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  isLoading = false;
  foundBooks: Book[] = [];

  // is fired when a book is selected in search result
  @Output()
  bookSelected = new EventEmitter<Book>();

  // triggers search
  keyup = new EventEmitter<string>();

  constructor( private bookStoreService: BookStoreService ) { }

  ngOnInit() {
    this.keyup
      .debounceTime(500) // waits the given value in ms before executing
      .distinctUntilChanged() // only emits event if value has changed
      .do(() => this.isLoading = true)
      // maps 'outer' observable (searched value) to 'inner' observable of type Books[] from according service
      .switchMap(searchTerm => this.bookStoreService.getAllSearch(searchTerm))
      .do(() => this.isLoading = false)
      .subscribe(books => this.foundBooks = books);
  }

}
