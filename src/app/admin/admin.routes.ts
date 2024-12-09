import { Routes } from "@angular/router";
import { BookCreateComponent } from "./book-create/book-create.component";

export const adminRoutes: Routes = [
  { path: '', redirectTo: 'create', pathMatch: 'full' },
  { path: 'create', component: BookCreateComponent }
];

export default adminRoutes;
