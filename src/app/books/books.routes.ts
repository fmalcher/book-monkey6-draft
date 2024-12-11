import { Routes } from "@angular/router";
import { BookListComponent } from "./book-list/book-list.component";
import { BookDetailsComponent } from "./book-details/book-details.component";

export const booksRoutes: Routes = [
  {
    path: 'books',
    component: BookListComponent,
  },
  {
    path: 'books/:isbn',
    component: BookDetailsComponent,
  }
];
