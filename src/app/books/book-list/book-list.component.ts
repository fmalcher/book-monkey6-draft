import { Component, effect, signal } from '@angular/core';
import { Book } from '../../shared/book';
import { BookListItemComponent } from '../book-list-item/book-list-item.component';

@Component({
  selector: 'app-book-list',
  imports: [BookListItemComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  books = signal<Book[]>([]);
  favoriteBooks = signal<Book[]>([]);

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
      ]
    );

    // Like-Liste aus Localstorage abrufen
    const fromStorage = localStorage.getItem('likedbooks');
    if (fromStorage) {
      this.favoriteBooks.set(JSON.parse(fromStorage));
    }

    // Like-Liste speichern, wenn sie sich ändert
    effect(() => {
      localStorage.setItem('likedbooks', JSON.stringify(this.favoriteBooks()));
      console.log('Liked list written to storage');
    });
  }

  clearFavList() {
    this.favoriteBooks.set([]);
  }

  addToFavs(book: Book) {
    const foundBook = this.favoriteBooks().find(b => b.isbn === book.isbn);
    if (!foundBook) {
      this.favoriteBooks.update(favBooks => [...favBooks, book]);
    }
  }
}
