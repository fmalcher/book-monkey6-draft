import { Component, effect, signal, inject, computed } from '@angular/core';
import { Book } from '../../shared/book';
import { BookListItemComponent } from '../book-list-item/book-list-item.component';
import { BookStoreService } from '../../shared/book-store.service';

@Component({
  selector: 'app-book-list',
  imports: [BookListItemComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  #service = inject(BookStoreService);

  books = signal<Book[]>([]);
  favoriteBooks = signal<Book[]>([]);

  searchTerm = signal('');

  filteredBooks = computed(() => {
    // Leerer Suchbegriff? Ganze Liste ausgeben
    if (!this.searchTerm()) {
      return this.books();
    }

    const term = this.searchTerm().toLowerCase();

    // Liste filtern nach Suchbegriff im Titel
    return this.books().filter(b => b.title.toLowerCase().includes(term));
  })

  constructor() {
    this.#service.getAll().subscribe(books => {
      this.books.set(books);
    });

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
