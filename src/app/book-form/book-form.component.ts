import { Thumbnail } from './../shared/thumbnail';
import { BookFormErrorMessages } from './book-form-error-messages';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BookFactory } from './../shared/book-factory';
import { BookStoreService } from './../shared/book-store.service';
import { Book } from '../shared/book';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styles: []
})
export class BookFormComponent implements OnInit {

  // myForm = ID of form
  @ViewChild('myForm')
  myForm: NgForm;

  // default (empty) book initialization, error otherwise
  book: Book = BookFactory.empty();

  errors: { [key: string]: string } = {};

  constructor(
    private bookStoreService: BookStoreService
  ) { }

  ngOnInit() {
    // register on observable stausChanges on form => if any errors happen, update
    this.myForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages() {
    this.errors = {};
    for (const bfem of BookFormErrorMessages) {
      const control = this.myForm.form.get(bfem.controlId);
      if (control                               // control exists
        && control.dirty                        // control value was changed
        && control.invalid                      // control value is invalid
        && control.errors[bfem.validationType]  // we actually have a validation message for the given type, e.g. minlength or required
        && !this.errors[bfem.controlId]) {      // error did not exist before
        this.errors[bfem.controlId] = bfem.message;
      }
    }
  }

  submitForm() {

    this.book.authors = this.myForm.value.authors.split(',');
    this.book.thumbnails = [this.myForm.value.thumbnail];

    const book = BookFactory.fromObject(this.book);

    // submit book to bookStoreService for creation and after response, reset form and data
    this.bookStoreService.insert(book).subscribe(response => this.reset());
  }

  reset() {
    this.book = BookFactory.empty();
    this.myForm.reset(BookFactory.empty());
  }
}
