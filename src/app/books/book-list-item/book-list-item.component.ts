import { Component, input, output } from '@angular/core';
import { Book } from '../../shared/book';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-list-item',
  imports: [RouterLink],
  templateUrl: './book-list-item.component.html',
  styleUrl: './book-list-item.component.scss'
})
export class BookListItemComponent {
  book = input.required<Book>();
  favAdd = output<Book>();

  addToFavs() {
    this.favAdd.emit(this.book());
  }
}
