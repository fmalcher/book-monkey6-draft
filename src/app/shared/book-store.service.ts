import { inject, Injectable } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  #apiUrl = 'https://api5.angular-buch.com';
  #http = inject(HttpClient);

  getAll(): Observable<Book[]> {
    return this.#http.get<Book[]>(`${this.#apiUrl}/books`)
      .pipe(map(books => books.map(toBook))); // HACK
  }

  getSingle(isbn: string): Observable<Book> {
    return this.#http.get<Book>(`${this.#apiUrl}/books/${isbn}`)
      .pipe(map(b => toBook(b))); // HACK
  }

  remove(isbn: string): Observable<unknown> {
    return this.#http.delete(`${this.#apiUrl}/books/${isbn}`);
  }

  create(book: Book): Observable<Book> {
    return this.#http.post<Book>(`${this.#apiUrl}/books`, book)
      .pipe(map(b => toBook(b))); // HACK
  }

  search(term: string): Observable<Book[]> {
    return this.#http.get<Book[]>(`${this.#apiUrl}/books/search/${term}`)
      .pipe(map(books => books.map(toBook))); // HACK
  }
}

// TEMPORARY HACK
function toBook(data: any) {
  const { thumbnailUrl, ...b } = data;
  return {
    ...b,
    imageUrl: thumbnailUrl,
    createdAt: new Date().toISOString()
  };
}
