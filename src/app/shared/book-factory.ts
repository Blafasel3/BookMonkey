import { Book, Thumbnail } from './book';
export class BookFactory {

  static empty(): Book {
    return new Book('', '', [''], new Date(), '', 0, [new Thumbnail('', '')], '');
  }

  static fromObject(rawBook: any) {
    return new Book(
      rawBook.isbn,
      rawBook.title,
      rawBook.authors,
      typeof (rawBook.publihsed) === 'string' ? new Date(rawBook.published) : rawBook.published,
      rawBook.subtitle,
      rawBook.rating,
      rawBook.thumbnails,
      rawBook.description
    );
  }
}
