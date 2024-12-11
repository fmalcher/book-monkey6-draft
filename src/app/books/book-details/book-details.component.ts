import { Component, inject, input } from '@angular/core';
import { BookStoreService } from '../../shared/book-store.service';
import { Router, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

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
  book = rxResource({
    request: this.isbn,
    loader: ({ request }) => this.#service.getSingle(request)
  });

  removeBook(isbn: string) {
    if (window.confirm('Remove book?')) {
      this.#service.remove(isbn).subscribe(() => {
        this.#router.navigateByUrl('/books');
      });
    }
  }

}
