import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { BookValidators } from './../shared/book.validators';
import { Thumbnail } from '../../shared/thumbnail';
import { BookFormErrorMessages } from './book-form-error-messages';
import { BookFactory } from '../../shared/book-factory';
import { BookStoreService } from '../../shared/book-store.service';
import { Book } from '../../shared/book';


@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styles: []
})
export class BookFormComponent implements OnInit {

  // default (empty) book initialization, error otherwise
  book: Book = BookFactory.empty();

  isUpdatingBook = false;
  myForm: FormGroup;
  authors: FormArray; // allows multiple authors input
  thumbnails: FormArray; // allows multiple thumbnail input

  errors: { [key: string]: string } = {};

  constructor(
    private bookStoreService: BookStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const data = this.route.snapshot.data;
    if (data['book']) {
      this.isUpdatingBook = true;
      this.book = data['book'];
    }
    this.initBookForm();
  }

  initBookForm() {
    this.buildAuthorsArray();
    this.buildThumbnailsArray();

    this.myForm = this.formBuilder.group({
      title: [this.book.title, Validators.required],
      subtitle: this.book.subtitle,
      isbn: [
        this.book.isbn, [
          Validators.required,
          BookValidators.isbnExists
        ], this.isUpdatingBook ? null : BookValidators.isbnExists(this.bookStoreService)
      ],
      description: this.book.description,
      authors: this.authors,
      thumbnails: this.thumbnails,
      published: this.book.published
    });
    // register to observable of status changes and update error messages accordingly
    this.myForm.statusChanges.subscribe(() => this.updateErrorMessages);
  }


  buildAuthorsArray() {
    this.authors = this.formBuilder.array(this.book.authors, BookValidators.atLeastOneAuthor);

  }

  addAuthorControl() {
    this.authors.push(this.formBuilder.control(null));
  }

  buildThumbnailsArray() {
    this.thumbnails = this.formBuilder.array(this.book.thumbnails.map(
      thumbnail => this.formBuilder.group({
        url: this.formBuilder.control(thumbnail.url),
        title: this.formBuilder.control(thumbnail.title)
      })
    ));
  }

  addThumbnailControl() {
    this.thumbnails.push(this.formBuilder.group({ url: null, title: null }));
  }

  updateErrorMessages() {
    this.errors = {};
    for (const bfem of BookFormErrorMessages) {
      const control = this.myForm.get(bfem.controlId);
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

    // filter empty values
    this.myForm.value.authors = this.myForm.value.authors.filter(author => author);
    this.myForm.value.thumbnails = this.myForm.value.thumbnails.filter(thumbnail => thumbnail);

    const book = BookFactory.fromObject(this.myForm.value);

    if (this.isUpdatingBook) {
      this.bookStoreService.update(book).subscribe(response => this.handleUpdatedBook(book));
    } else {
      // submit book to bookStoreService for creation and after response, reset form and data
      this.bookStoreService.insert(book).subscribe(response => this.reset());
    }
  }

  handleUpdatedBook(book: Book) {
    alert('Book successfully updated.');
    this.router.navigate(['../../books', book.isbn], { relativeTo: this.route });
  }

  reset() {
    window.alert('Book successfully created.');
    this.book = BookFactory.empty();
    this.myForm.reset(BookFactory.empty());
  }
}
