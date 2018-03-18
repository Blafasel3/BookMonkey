import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book, Thumbnail } from '../shared/book';
import { BookStoreService } from './../shared/book-store.service';
import { BookFactory } from '../shared/book-factory';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html'
})
export class BookDetailsComponent implements OnInit {

  book: Book = BookFactory.empty();

  constructor(
    private bookStoreService: BookStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.bookStoreService.getBook(params['isbn']).subscribe(book => this.book = book);
  }

  getRating(num: number): Number[] {
    return new Array(num);
  }

  removeBook() {
    if (confirm('Do you really want to delete this book form the list?')) {
      this.bookStoreService.remove(this.book.isbn)
        .subscribe(response => this.router.navigate(['../'], { relativeTo: this.route }));
    }
  }

}
