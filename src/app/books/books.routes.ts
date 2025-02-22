import { Routes } from "@angular/router";
import { BookListComponent } from "./book-list/book-list.component";
import { BookDetailsComponent } from "./book-details/book-details.component";

export const booksRoutes: Routes = [
  {
    path: '',
    component: BookListComponent,
  },
  {
    path: ':isbn',
    component: BookDetailsComponent,
  }
];

export default booksRoutes;
