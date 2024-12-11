import { Component, signal } from '@angular/core';
import { Book } from '../../shared/book';

@Component({
  selector: 'app-book-list',
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  books = signal<Book[]>([]);

  constructor() {
    this.books.set(
      [
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
      ])
    }
}
