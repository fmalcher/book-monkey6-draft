# BookMonkey 6 Draft

- Mehr Fokus auf Praxisprojekt, die Buchstruktur orientiert sich an den Umsetzungsthemen, nicht zwingend an Fachthemen
- Ein Kapitel muss nicht immer ein ganzes Thema abdecken, sondern Themen**teile** sind auch okay. Es gibt Querschnittsthemen, die gelernte Aspekte nochmal aufgreifen.
- Es gibt BM-Schritte, die eine vorherige Lösung refactoren. Deshalb sollte jeder BM-Schritt einen eigenen Mini-Monkey bekommen.
- Forms nur noch Create

## Entwurf für Struktur Praxisteil

## Projekt anlegen

- `ng new book-monkey --style=scss --no-ssr`
- Styles einbinden
- `AppComponent` leeren (auch Property `title`)
- Template für AppComponent: `<main></main>`


### [THEORIE] Komponenten

- Template-Syntax: Interpolation, for, if, let
- Signals Basics: Idee, `signal()`, Getter, `.set()`/`.update()`

### [BM] Buchliste

- Interface `Book` anlegen: `ng g i shared/book`
  - `createdAt` (Erstellungsdatum des Datensatzes)
  - optionales Feld `subtitle` (für `@if` im Template)
- Komponente anlegen: `ng g c books-portal/book-list`
- einbinden in AppComponent
- Signal `books` für die Buchliste, statische Bücher
- `@for` im Template (Variable `b`)

### [THEORIE] Property Bindings, Inputs

### [BM] Property Bindings Item-Komponente

- Komponente anlegen: `ng g c books-portal/book-item`
- Listen-Template aus BookList in Item-Komponente auslagern
  - `book = input.required<Book>()`
  - `@let` verwenden, damit wir nicht überall bei `b` die Klammern hinzufügen müssen: `@let b = book();`
- Komponente einbinden in BookList, `@for` bleibt im Container, Property Binding für einzelne Bücher

### [THEORIE] Event Bindings, Outputs

### [BM] Event Binding Favoritenliste

- lokale Favoritenliste
- Item:
  - Output `like` und Methode `likeBook()`
  - Button im Template
- BookList:
  - sammelt Favoritenliste und zeigt sie an
  - Signal `likedBooks` wie `books`
  - Methode `addLikedBook()` aktualisiert Liste (Immutability!)
  - Event Binding im Template
- Liste leeren
  - Methode `clearLikedBooks()`
  - Button im Template

### [THEORIE] Services, Dependency Injection

### [BM] Service mit statischen Büchern

- `ng g s shared/book-store`
- statische Buchliste aus BookList verschieben in Service
- in BookList: `this.books.set(this.#service.getBookList())`
- nicht `getAll()`, weil wir die Methode später auch für Filter verwenden, dann sind es nicht mehr *alle* Bücher

### [THEORIE] Signals Advanced

- computed
- linkedSignal
- effect

### [BM] Lokaler Filter mit computed

- rein lokale Suche in der Buchliste
- Signal für Suchbegriff: `searchTerm = signal('')`. Property über `books` anlegen, brauchen wir später
- Eingabefeld mit nativen Bindings `(input)` und `[value]`
  - ggf. migrieren wir das später auf einen Forms-Ansatz
- `computed` rechnet aus der Buchliste und dem Suchbegriff eine gefilterte Liste `filteredBooks` aus
- Template: `books()` ändern zu `filteredBooks()`

### [THEORIE] Routing

- Routing wie immer
- auch `Router.navigate()` erläutern

### [BM] Routing mit lokaler Buchliste

- HomeComponent anlegen:
  - `ng g c home`
  - Template mit Begrüßungstext
- `ng g c books-portal/book-details`
- Routen definieren in `books-portal.routes.ts`
- alles zusammenführen in `app.routes.ts`
- RouterOutlet platzieren
- Import für BookListComponent entfernen
- Weiterleitung von Root zu `home`
- Links setzen
  - Item zu Details
  - Details zu List
  - Navigationsleiste in AppComponent (Home, Books)
- Detailseite bauen
  - Service `getOneBook()`
  - Parameter mit ActivatedRoute synchron abfragen
  - `BookStoreService.getOneBook()` sucht synchron in lokaler Liste, dann `this.book.set()`

### [THEORIE] Component Input Binding

- den Teil ggf. auch in Theorie Routing integrieren, später schauen

### [BM] Component Input Binding

- `withComponentInputBinding()` in `app.config.ts` aktivieren
- Detailseite:
  - Konstruktor und `#route` komplett weg
  - Input `isbn`
  - `computed` wandelt ISBN in Buch um (weil der Service das synchron liefert)
- Argumentation: Detailkomponente hat keine Abhängigkeit zu ActivatedRoute mehr

### [THEORIE] HTTP

- fetch in der Theorie erläutern
- HttpClient erläutern
  - Vorteile nennen: in Angular integriert, mit DI mockbar beim Testing, Interceptors, … (?)
  - aber auch klar sagen, dass es auch okay ist, wenn man die Angular-Lösung nicht nutzt und lieber fetch nimmt
- hier noch keine Resource

### [BM] Daten laden mit HTTP

- HttpClient, aber auf RxJS nicht näher eingehen
- `app.config.ts`: `provideHttpClient(withFetch())`
- Service:
  - `inject(HttpClient)`
  - `getBookList()` umbauen
- **Buchliste:** `getBookList().subscribe()` und `books.set()`
- Service `getOneBook()` umbauen
- **Detailseite:**
  - `book` wird wieder mit `signal()` initialisiert
  - Effect reagiert auf geänderte ISBN, `getOneBook(this.isbn()).subscribe()` und `book.set()`
- **Buch löschen:**
  - Servicemethode anlegen
  - Methode und Button auf Detailseite
  - danach `Router.navigateByUrl()` zur Buchliste

### [THEORIE] Resource


### [BM] Resource

- **Buchliste:**
  - Service `getBookList()` umbauen auf `httpResource`
  - Komponente: Konstruktor weg
  - `books` wird Resource
  - in `filteredBooks` auf `books.value()` umstellen
  - Reload-Button
  - Ladeindikator mit `isLoading()`
- **Detailseite:**
  - Service `getOneBook()` umbauen: HttpResource mit Request, ganzes Signal übergeben
  - Komponente: `effect` weg
  - `book` wird Resource
  - Template: `book.value()`
  - Link zu anderer Detailseite (statische ISBN), damit deutlich wird, dass der erneute Request funktioniert. Diskutieren, dass die ISBN natürlich später aus der Datenbank o.Ä. kommen sollte


### [THEORIE] Pipes

- Tabelle mit allen Pipes zeigen
- nur ein paar wichtige Pipes erläutern: DatePipe, DecimalPipe, CurrencyPipe, JsonPipe
- Exkurs: Sprache einstellen (`LOCALE_ID`)

### [BM] Pipes

- Detailseite: DatePipe nutzen für `createdAt`
- ggf. eigene ISBN-Pipe

### [THEORIE] Forms

whatever it will be 🤷

### [BM] Forms Buch anlegen

- Vorbereitung
  - `ng g c books-admin/book-create`
  - `ng g c books-admin/book-form`
    - wir machen zwar kein Bearbeiten mehr, aber das kann eine gute Zusatzaufgabe für die Leser sein. Deswegen Komponententrennung berücksichtigen und auch diskutieren
  - `books-admin.routes.ts`: Route und Weiterleitung
  - einbinden in `app.routes.ts`
  - Eintrag in Navigation
  - Servicemethode `createBook()` bauen
  - BookCreate: Template mit Überschrift und Kindkomponente, damit man erstmal was sieht
- Formular bauen in BookForm
  - `ReactiveFormsModule` importieren
  - alles ähnlich wie aktuell im Buch
  - Template `@let c = bookForm.controls` und `[formControl]="c.isbn"` für Typsicherheit
  - mit dynamischen Autorenfeldern
  - `createdAt` beim Submit lokal hinzufügen
- verdrahten in BookCreate:
  - erst TypeScript: inject, Methode, navigate
  - Template mit Event Binding

### [BM] Suche in der Buchliste verbessern

- die beiden Aspekte ggf. in 2 Kapitel trennen, je nach Komplexität
- 1.) Suche mit HTTP in Buchliste
  - Service `getBookList()` umbauen: bekommt `searchTerm: Signal<string>` übergeben, wird als Request in Resource genutzt. Searchterm in HTTP-URL übergeben
  - BookList
    - `getBookList(this.searchterm)`
    - lokales `filteredBooks` kommt weg, im Template direkt auf `books.value()` gehen
- 2.) Suchbegriff als Query-Parameter
  - `this.search`: Input mit Component Input Binding für Parameter aus URL
  - `searchTerm` wird ein LinkedSignal, denn wir wollen es a) direkt setzen (aus dem Formular) und b) auf Basis eines anderen Signals berechnen lassen (`this.search`)
  - Effect mit `Router.navigate([], { queryParams: { search: this.searchTerm() || null } })` (null für unset)
  - TODO: Query Parameter nicht `search` nennen, damit er sich vom Param der API unterscheidet. Könnte man sonst verwechseln.

### [THEORIE] Lazy Loading

- Lazy Loading allgemein ("zur Laufzeit nachladen")
- Theorie `loadChildren` und `@defer`

### [BM] Lazy Loading

- Features `books-admin` und `books-portal` lazy laden
  - `app.routes.ts`: Imports und Spread weg
  - Basisrouten `books` und `admin` anlegen
  - in Feature-Routen: Präfix entfernen
  - bei Weiterleitung in `books-admin`: `pathMatch: 'full'` einfügen, weil Weiterleitung vom leeren Pfad
- (ggf. Default Export für Routes-Array nutzen)
- (ggf. HomeComponent mit `loadComponent` laden, später mal überlegen)


### [THEORIE] RxJS

- wie immer, ggf. kürzer
- AsyncPipe
- RxJS <> Signals (toSignal, toObservable)

### [BM] Suche mit RxJS

- Service: neue Methode `searchBooks(searchTerm: string): Observable<Book[]>`
- HomeComponent:
  - übliches RxJS-Beispiel, mit `FormControl.valueChanges`, wenn es das dann noch gibt
  - erstmal manuell subscriben, damit man was sieht
  - `toSignal()` mit `{ initialValue: [] }` verwenden


### Diskussionspunkte

- 0: Import für RouterOutlet am Anfang entfernen oder stehen lassen?
- 12: Query-Parameter nicht `search` nennen, weil der in der API auch so heißt und verwechselt werden könnte
- 6: Detailroute `books/:isbn` oder `books/details/:isbn`?
- Warnungen wegen Image-Größen


### Was noch rein könnte, aber nicht muss

- \[class\]/\[style\]
- eigener Validator: müssen aber abwarten, was mit Forms passiert
- NgOptimizedImage
