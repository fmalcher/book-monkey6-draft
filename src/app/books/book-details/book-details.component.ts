import { Component, inject, signal } from '@angular/core';
import { BookStoreService } from '../../shared/book-store.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../../shared/book';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  #service = inject(BookStoreService);
  #route = inject(ActivatedRoute);

  book = signal<Book | undefined>(undefined);

  constructor() {
    const isbn = this.#route.snapshot.paramMap.get('isbn');
    if (isbn) {
      this.book.set(this.#service.getSingle(isbn));
    }
  }
}
