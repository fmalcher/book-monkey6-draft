import { Component, effect, inject, input, signal } from '@angular/core';
import { BookStoreService } from '../../shared/book-store.service';
import { Router, RouterLink } from '@angular/router';
import { Book } from '../../shared/book';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  #service = inject(BookStoreService);
  #router = inject(Router);

  isbn = input.required<string>();
  book = signal<Book | undefined>(undefined);

  constructor() {
    effect(() => {
      this.#service.getSingle(this.isbn()).subscribe(book => {
        this.book.set(book);
      });
    });
  }

  removeBook(isbn: string) {
    if (window.confirm('Remove book?')) {
      this.#service.remove(isbn).subscribe(() => {
        this.#router.navigateByUrl('/books');
      });
    }
  }

}
