import { Component, inject, signal } from '@angular/core';
import { BookStoreService } from '../shared/book-store.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  #service = inject(BookStoreService);

  searchControl = new FormControl('', { nonNullable: true });
  isLoading = signal(false);

  results = toSignal(this.searchControl.valueChanges.pipe(
    filter(term => term.length >= 3),
    debounceTime(500),
    distinctUntilChanged(),
    tap(() => this.isLoading.set(true)),
    switchMap(term => this.#service.search(term)),
    tap(() => this.isLoading.set(false)),
  ), { initialValue: [] });
}
