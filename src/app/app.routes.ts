import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { booksRoutes } from './books/books.routes';
import { adminRoutes } from './admin/admin.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  ...booksRoutes,
  ...adminRoutes
];
