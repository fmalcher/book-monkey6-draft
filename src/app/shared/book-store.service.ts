import { inject, Injectable } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  #apiUrl = 'https://api5.angular-buch.com';
  #http = inject(HttpClient);

  getAll(): Observable<Book[]> {
    return this.#http.get<Book[]>(`${this.#apiUrl}/books`);
  }

  getSingle(isbn: string): Observable<Book> {
    return this.#http.get<Book>(`${this.#apiUrl}/books/${isbn}`);
  }

  remove(isbn: string): Observable<unknown> {
    return this.#http.delete(`${this.#apiUrl}/books/${isbn}`);
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, book);
  }

  search(term: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books/search/${term}`);
  }
}
