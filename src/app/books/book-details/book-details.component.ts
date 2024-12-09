import { Component, computed, inject, input } from '@angular/core';
import { BookStoreService } from '../../shared/book-store.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  #service = inject(BookStoreService);

  isbn = input.required<string>();
  book = computed(() => this.#service.getSingle(this.isbn()))
}
