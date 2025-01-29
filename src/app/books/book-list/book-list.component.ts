import { Component, effect, signal, inject, computed, input, linkedSignal } from '@angular/core';
import { Book } from '../../shared/book';
import { BookListItemComponent } from '../book-list-item/book-list-item.component';
import { BookStoreService } from '../../shared/book-store.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  imports: [BookListItemComponent, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  #service = inject(BookStoreService);
  #router = inject(Router);

  /*books = rxResource({
    request: () => this.searchTerm(),
    loader: ({ request }) => this.#service.search(request)
  });*/

  favoriteBooks = signal<Book[]>([]);

  search = input<string>(); // Query-Parameter
  searchTerm = linkedSignal(() => this.search() || ''); // finaler Suchbegriff

  books = this.#service.getAll(this.searchTerm);

  constructor() {
    // Suchbegriff in der URL aktualisieren
    effect(() => {
      this.#router.navigate([], { queryParams: { search: this.searchTerm() || null } });
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
