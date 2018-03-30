import { Pipe, PipeTransform, Component } from '@angular/core';

@Pipe({
  name: 'isbn'
})
export class IsbnPipe implements PipeTransform {

  static allowedLengths: Array<number> = [10, 13];

  transform(value: any, addPrefix: boolean): any {
    const len = value.length;
    if (!value || !IsbnPipe.allowedLengths.includes(len)) {
      return null;
    }

    let prefix = '';
    if (addPrefix) {
      prefix = 'ISBN-' + len + ': ';
    }

    if (len === 10) {
      return prefix + value;
    } else if (len === 13) {
      return `${prefix}${value.substr(0, 3)}-${value.substr(3)}`;
    }
  }

}
