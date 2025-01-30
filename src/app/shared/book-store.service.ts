import { inject, Injectable, resource, Resource, Signal } from '@angular/core';
import { Book } from './book';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// HACK
export function httpResource<T>(params: { url: () => string; request?: () => string }): Resource<T> {
  return resource({
    request: params.request || (() => ''),
    loader: () => fetch(params.url()).then(res => res.json()) as Promise<T>
  });
}

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  #apiUrl = 'https://api6.angular-buch.com';
  #http = inject(HttpClient);

  getAll(search: Signal<string>): Resource<Book[]> {
    // return this.#http.get<Book[]>(`${this.#apiUrl}/books`);
    return httpResource<Book[]>({
      request: search,
      url: () => `${this.#apiUrl}/books?search=${search()}`,
    })
  }

  getSingle(isbn: Signal<string>): Resource<Book> {
    // return this.#http.get<Book>(`${this.#apiUrl}/books/${isbn}`);
    return httpResource<Book>({
      request: isbn,
      url: () => `${this.#apiUrl}/books/${isbn()}`,
    })
  }

  remove(isbn: string): Observable<unknown> {
    return this.#http.delete(`${this.#apiUrl}/books/${isbn}`);
  }

  create(book: Book): Observable<Book> {
    return this.#http.post<Book>(`${this.#apiUrl}/books`, book);
  }

  search(term: string): Observable<Book[]> {
    const params = new HttpParams().set('search', term);
    return this.#http.get<Book[]>(`${this.#apiUrl}/books`, { params });
  }
}



