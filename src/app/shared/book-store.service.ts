import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  #books: Book[] = [
    {
      isbn: '12345',
      title: 'Tierisch gut kochen',
      authors: ['Mrs Chimp', 'Mr Gorilla'],
      subtitle: 'Rezepte von Affe bis Zebra',
      imageUrl: 'https://cdn.ng-buch.de/kochen.png',
      description: 'Immer lecker und gut',
      createdAt: new Date().toISOString()
    },
    {
      isbn: '67890',
      title: 'Backen mit Affen',
      subtitle: 'Bananenbrot und mehr',
      authors: ['Orang Utan'],
      imageUrl: 'https://cdn.ng-buch.de/backen.png',
      description: 'Tolle Backtipps für Mensch und Tier',
      createdAt: new Date().toISOString()
    }
  ];

  getAll(): Book[] {
    return this.#books;
  }

  getSingle(isbn: string): Book | undefined {
    return this.#books.find(book => book.isbn === isbn);
  }
}
