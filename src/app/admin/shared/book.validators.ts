import { BookStoreService } from '../../shared/book-store.service';
import { FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

export class BookValidators {

  static isbnFormat(control: FormControl): { [error: string]: any } {
    if (!control || !control.value) {
      return null;
    }

    const isolatedNumbers = control.value.replace(/-/g, '');
    const isbnPattern = /(^\d{10}$)|(^\d{13}$)/;
    return isbnPattern.test(isolatedNumbers) ? null : {
      isbnFormat: { valid: false }
    };
  }

  static atLeastOneAuthor(controlArry: FormArray): { [error: string]: any } {
    const check = controlArry.controls.some(el => el.value);
    return check ? null : { atLeastOneAuthor: { valid: false } };
  }

  static isbnExists(bookStoreService: BookStoreService) {
    return function (control: FormControl): Observable<{ [error: string]: any }> {
      return bookStoreService.exists(control.value)
        .map(exists => (exists === false) ? null : {
          isbnExists: { valid: false }
        });
    };
  }
}
