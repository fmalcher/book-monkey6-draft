import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'books',
    loadChildren: () => import('./books/books.routes')
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes')
  }
];
