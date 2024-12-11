import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { booksRoutes } from './books/books.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  ...booksRoutes
];
