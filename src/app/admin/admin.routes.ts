import { Routes } from "@angular/router";
import { BookCreateComponent } from "./book-create/book-create.component";

export const adminRoutes: Routes = [
  { path: 'admin', redirectTo: 'admin/create', pathMatch: 'full' },
  { path: 'admin/create', component: BookCreateComponent }
];
