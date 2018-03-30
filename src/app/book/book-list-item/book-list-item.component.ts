import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book, Thumbnail } from '../../shared/book';




@Component({
  selector: 'bm-book-list-item',
  templateUrl: './book-list-item.component.html'
})
export class BookListItemComponent {

  @Input()
  book: Book;

}
