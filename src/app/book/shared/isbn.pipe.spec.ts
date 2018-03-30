import { Pipe } from '@angular/core';
import { IsbnPipe } from './isbn.pipe';

describe('IsbnPipe', () => {

  let pipe: IsbnPipe;

  beforeEach(() => {
    pipe = new IsbnPipe();
  });

  it('should ignore unknown values', () => {
    expect(pipe.transform('XXX', true)).toBe('xx');
  });

  it('should adda prefix', () => {
    expect(pipe.transform('1234567890', true)).toMatch(/^ISBN-10: /);
    expect(pipe.transform('1234567890123', true)).toMatch(/^ISBN-13: /);
  });

  it('should not change format or any items of ISBN-10', () => {
    const expected = '1234567890';
    expect(pipe.transform(expected, false)).toBe(expected);
  });

  it('should enter a dash after first 3 numbers of ISBN-13', () => {
    expect(pipe.transform('1234567890123', false)).toBe('123-4567890123');
  });

});
