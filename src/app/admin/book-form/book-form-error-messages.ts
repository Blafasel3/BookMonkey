export class ErrorMessage {
  constructor(
    public controlId: string,
    public validationType: string,
    public message: string
  ) { }
}

export const BookFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Book title is required'),
  new ErrorMessage('title', 'pattern', 'Title contains invalid characters'),
  new ErrorMessage('isbn', 'required', 'International standard book number (ISBN) is required'),
  new ErrorMessage('isbn', 'isbnFormat', 'ISBN must be 10 or 13 characters long (excluding )'),
  new ErrorMessage('isbn', 'isbnExists', 'ISBN exists already'),
  new ErrorMessage('published', 'required', 'A publish date is required'),
  new ErrorMessage('authors', 'atLeastOneAuthor', 'At least one author is required')
];
