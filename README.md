# BookMonkey 6 Draft

- Mehr Fokus auf Praxisprojekt, die Buchstruktur orientiert sich an den Umsetzungsthemen, nicht zwingend an Fachthemen
- Ein Kapitel muss nicht immer ein ganzes Thema abdecken, sondern Themen**teile** sind auch okay. Es gibt Querschnittsthemen, die gelernte Aspekte nochmal aufgreifen.
- Es gibt BM-Schritte, die eine vorherige Lösung refactoren. Deshalb sollte jeder BM-Schritt einen eigenen Mini-Monkey bekommen.
- Forms nur noch Create

## Entwurf für Struktur Praxisteil


### [THEORIE] Komponenten

- Template-Syntax: Interpolation, for, if, let
- Signals Basics: Idee, `signal()`, Getter, `.set()`/`.update()`

### [BM] Buchliste

- BookListComponent mit statischen Büchern
- Interface Book
  - `createdAt` (Erstellungsdatum des Datensatzes)
  - optionales Feld `subtitle` (für `@if` im Template)
- Signal `books` für die Buchliste, `@for` im Template (Variable `b`)

### [THEORIE] Property Bindings, Inputs

### [BM] Property Bindings Item-Komponente

- Listen-Template aus BookList in Item-Komponente auslagern
- `book = input<Book>()`
- `@let` verwenden, damit wir nicht überall bei `book` die Klammern hinzufügen müssen: `@let b = book();`
- `@for` bleibt im Container, Property Binding für einzelne Bücher

### [THEORIE] Event Bindings, Outputs

### [BM] Event Binding Favoritenliste

- lokale Favoritenliste in BookList
- Item bekommt Button, Event nach oben zum Container werfen
- im Container wird Favoritenliste gesammelt und (ganz einfach) angezeigt
- Immutability (aktualisieren der lokalen Liste)
- Button zum Leeren der Liste (sonst ist es mit 2 Büchern nicht gut zu bedienen)
- `output()`

### [THEORIE] Services, Dependency Injection

### [BM] Service mit statischen Büchern

- statische Buchliste aus BookList verschieben in neuen `BookStoreService`
- in BookList: `this.books.set(this.service.getBookList())`
- nicht `getAll()`, weil wir die Methode später auch für Filter verwenden, dann sind es nicht mehr *alle* Bücher

### [THEORIE] Signals Advanced

- computed
- linkedSignal
- effect

### [BM] Lokaler Filter mit computed

- rein lokale Suche in der Buchliste
- Signal für Suchbegriff: `searchTerm = signal('')`
- Eingabefeld mit nativen Bindings `(input)` und `[value]`
  - ggf. migrieren wir das später auf einen Forms-Ansatz
- `computed` rechnet aus der Buchliste und dem Suchbegriff eine gefilterte Liste `filteredBooks` aus, die angezeigt wird

### [THEORIE] Routing

- Routing wie immer
- auch `Router.navigate()` erläutern

### [BM] Routing mit lokaler Buchliste

- Buchliste und Detailseite, HomeComponent (nur Begrüßungstext)
- RouterOutlet platzieren, Routen definieren (separate `booksRoutes`)
- Links setzen
- Navigationsleiste in AppComponent (Home, Books, Admin)
- Detailseite bauen
  - Parameter mit ActivatedRoute synchron abfragen
  - `BookStoreService.getOneBook()` sucht synchron in lokaler Liste, dann `this.book.set()`

### [THEORIE] Component Input Binding

- den Teil ggf. auch in Theorie Routing integrieren, später schauen

### [BM] Component Input Binding

- Routenparameter als Input empfangen
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
- **Buchliste:** `getBookList().subscribe()` und `books.set()`
- **Detailseite:** Effect reagiert auf geänderte ISBN, `getOneBook(this.isbn()).subscribe()` und `book.set()`

### [BM] Buch löschen

- Servicemethode anlegen
- Buch löschen auf der Detailseite
- danach `Router.navigate()` zur Buchliste

### [THEORIE] Resource


### [BM] Resource

- **Buchliste:**
  - laden mit HttpResource (wird von Service generiert, `getBookList()` umbauen)
  - Ladeindikator mit `isLoading()`
  - Reload-Button
- **Detailseite:**
  - HttpResource mit Request, ganzes Signal übergeben: `this.#service.getOneBook(this.isbn)`
  - Link zu anderer Detailseite (statische ISBN), damit deutlich wird, dass der erneute Request funktioniert. Diskutieren, dass die ISBN natürlich später aus der Datenbank o.Ä. kommen sollte


### [THEORIE] Pipes

- Tabelle mit allen Pipes zeigen
- nur ein paar wichtige Pipes erläutern: DatePipe, DecimalPipe, CurrencyPipe, JsonPipe
- Exkurs: Sprache einstellen (`LOCALE_ID`)

### [BM] Pipes

- DatePipe nutzen für `createdAt`
- ggf. eigene ISBN-Pipe

### [THEORIE] Forms

whatever it will be 🤷

### [BM] Forms Buch anlegen

- Vorbereitung
  - Feature `admin` mit eigener Routendatei
  - Komponenten BookForm und BookCreate
  - wir machen zwar kein Bearbeiten mehr, aber das kann eine gute Zusatzaufgabe für die Leser sein. Deswegen Komponententrennung berücksichtigen und auch diskutieren
  - Servicemethode `create()` bauen
  - verdrahten: Route auf BookCreate, dort BookForm einbinden
- Formular bauen in BookForm
  - mit dynamischen Autorenfeldern
  - `createdAt` beim Submit lokal hinzufügen

### [BM] Suche in der Buchliste verbessern

- die beiden Aspekte ggf. in 2 Kapitel trennen, je nach Komplexität
- 1.) Suche mit HTTP in Buchliste
  - Service `getBookList()` umbauen: bekommt `searchTerm: Signal<string>` übergeben, wird als Request in Resource genutzt. Searchterm in HTTP-URL übergeben
  - Buchliste: lokales `filteredBooks` kommt weg, im Template direkt auf `books.value()` gehen
- 2.) Suchbegriff als Query-Parameter
  - `this.search`: Input mit Component Input Binding für Parameter aus URL
  - `searchTerm` wird ein LinkedSignal, denn wir wollen es a) direkt setzen (aus dem Formular) und b) auf Basis eines anderen Signals berechnen lassen (`this.search`)
  - Effect mit `Router.navigate([], { queryParams: { search: this.searchTerm() || null } })` (null für unset)

### [THEORIE] Lazy Loading

- Lazy Loading allgemein ("zur Laufzeit nachladen")
- Theorie `loadChildren` und `@defer`

### [BM] Lazy Loading

- Features `admin` und `books` lazy laden
- ggf. Default Export für Routes-Array nutzen
- bei mehreren Features sehr eindrucksvoll sichtbar, deshalb brauchen wir das admin-Feature
- HomeComponent auch sinnvoll, weil dann beim Start noch kein Lazy-Feature geladen ist
  - ggf. HomeComponent mit `loadComponent` laden, später mal überlegen


### [THEORIE] RxJS

- wie immer, ggf. kürzer
- AsyncPipe
- RxJS <> Signals (toSignal, toObservable)

### [BM] RxJS Richtige Suche

- Typeahead-Suche mit HTTP auf der Startseite (komplett separat von der Buchliste)
- übliches RxJS-Beispiel, gerne mit `FormControl.valueChanges` (falls es sowas dann noch gibt)
- `toSignal` verwenden

### Was noch rein könnte, aber nicht muss

- \[class\]/\[style\]
- eigener Validator: müssen aber abwarten, was mit Forms passiert
- NgOptimizedImage
