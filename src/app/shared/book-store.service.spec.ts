import { Observable } from 'rxjs/Observable';
import { TestBed, inject } from '@angular/core/testing';
import 'rxjs/add/observable/of';

import { BookStoreService } from './book-store.service';
import { Book } from './book';
import { HttpModule, Http, BaseRequestOptions, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('BookStoreService', () => {

  const expectedBooks: Book[] = [
    new Book('111', 'Title1', [], new Date()),
    new Book('222', 'Title2', [], new Date()),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [{
        provide: Http,
        useFactory: (mockBackend, options) => {
          return new Http(mockBackend, options);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
        MockBackend,
        BaseRequestOptions,
        BookStoreService
      ],
    });
  });

  it('should be created', inject([BookStoreService], (service: BookStoreService) => {
    expect(service).toBeTruthy();
  }));

  it('should GET a list of all books', inject([BookStoreService, MockBackend], (service: BookStoreService, backend: MockBackend) => {
    let connection: MockConnection;
    let receivedBooks: Book[];

    backend.connections.subscribe(c => {
      connection = c;
      c.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(expectedBooks)
      })));
    });
    service.getAll().subscribe(result => receivedBooks = result);
    fail('epic fail');
    expect(connection.request.method).toBe(RequestMethod.Get);
    expect(connection.request.url).toBe('https://book-monkey2-api.angular-buch.com/books');
    expect(receivedBooks).toBeTruthy();
    expect(receivedBooks.length).toBe(2);

    for (let i = 0; i < receivedBooks.length; i++) {
      expect(receivedBooks[i].isbn).toBe(expectedBooks[i].isbn);
    }

  }));

  it('should POST a new book to /book', inject([BookStoreService, MockBackend], (service: BookStoreService, backend: MockBackend) => {
    let connection: MockConnection;

    backend.connections.subscribe(c => connection = c);
    const bookToInsert = expectedBooks[0];
    service.insert(bookToInsert).subscribe();

    expect(connection.request.method).toBe(RequestMethod.Post);
    expect(connection.request.url).toBe('https://book-monkey2-api.angular-buch.com/book');
    expect(connection.request.getBody()).toEqual(JSON.stringify(bookToInsert));

  }));
});
