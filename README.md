## BookMonkey

| Angular Feature             | BookMonkey Umsetzung                                      | Notizen |
|-----------------------------|-----------------------------------------------------------|---------|
| input()                     | BookListItem                                              |         |
| output()                    | Favoritenliste                                            |         |
| signal()                    | Buchliste                                                 |         |
| computed()                  | lokaler Filter in BookList (z. B. Rating, Suchfeld, etc.) |         |
| effect()                    | Detailseite, bevor wir Component Input Binding machen     |         |
| Router                      | Startseite/BookList/Details/Form etc.                     |         |
| withComponentInputBinding() | BookDetails                                               |         |
| linkedSinal()               |                                                           |         |
| resource()                  | Buchliste und Detailseite                                 |         |
| rxResource()                |                                                           |         |
| HttpClient                  |                                                           |         |
| Reactive Forms              |                                                           |         |
| @let                        | Item-Komponente, Forms (fällt ggf. weg)                   |         |

## Sonstige Ideen

- DK: Ggf. `<details>/<summary>`, Anzeige des Covers nur bei angeklicktem Item
  - FM: klingt nett, aber hat ja gar nichts mit Angular zu tun und geht mir zu weit von den eigentlichen Themen weg

---

## Struktur BM Entwurf Ferdinand

- Ein Kapitel muss nicht immer ein ganzes Thema abdecken, sondern Themen**teile** sind auch okay. Es gibt Querschnittsthemen, die gelernte Aspekte zusammenfassen.
- Es gibt BM-Schritte, die eine vorherige Lösung refactoren. Deshalb sollte jeder BM-Schritt einen eigenen Mini-Monkey bekommen.
- Datenmodell vereinfachen
- Forms nur noch Create


### [THEORIE] Komponenten, Signals Intro

### [BM] Buchliste

- BookListComponent mit statischen Büchern
- Interface Book
  - kein Datum
  - optionales Feld? Brauchen wir für `@if`
  - createdAt
- Signal für die Buchliste
- Template-Syntax: Interpolation, for, if

### [THEORIE] Property Bindings, Inputs

### [BM] Property Bindings Item-Komponente

- Listen-Template aus BookList in Item-Komponente auslagern
- @let verwenden, damit wir nicht überall bei `book` die Klammern hinzufügen müssen: `@let b = book();`
- for bleibt im Container, Property Binding für einzelne Bücher
- input()

### [THEORIE] Event Bindings, Outputs

### [BM] Event Binding Favoritenliste

- lokale Favoritenliste in der BookList
- Item bekommt Button, Event nach oben zum Container werfen
- im Container wird Favoritenliste gesammelt und (ganz einfach) angezeigt
- Immutability (aktualisieren der lokalen Liste)
- Button zum Leeren der Liste (sonst ist es mit 2 Büchern doof zu bedienen)
- output()

### [THEORIE] Services, Dependency Injection

### [BM] Service mit statischen Büchern

- statische Buchliste aus BookList verschieben in neuen BookStoreService
- in BookList: `this.books.set(this.service.getAll())`

### [THEORIE] Signals Advanced

- computed
- linkedSignal? Brauchen wir erst später
- effect

### [BM] Lokaler Filter mit computed

- rein lokale Suche in der Buchliste
- `<input>`-Feld mit nativen Bindings: `(input)` und `[value]`
  - ggf. migrieren wir das später auf einen Forms-Ansatz
- Eingabefeld, das mit Event ein Signal setzt: `searchTerm = signal('')`
- computed rechnet aus der Buchliste und dem Suchbegriff eine gefilterte Liste aus `filteredBooks`, die angezeigt wird

### [THEORIE] Routing

- Routing wie immer
- auch `Router.navigate()` erläutern

### [BM] Routing mit lokaler Buchliste

- Buchliste und Detailseite, HomeComponent (brauchen wir nicht unbedingt, ist aber nachher für Lazy Loading strategisch gut)
- RouterOutlet platzieren, Routen definieren (separate booksRoutes), Links setzen
- Navigationsleiste in AppComponent (Home, Books, Admin)
- Detailseite bauen
  - Parameter mit ActivatedRoute synchron abfragen
  - `BookStoreService.getSingle()` sucht synchron in lokaler Liste, dann `this.book.set()`

### [THEORIE] Component Input Binding

- den Teil ggf. auch in Theorie Routing integrieren, später schauen

### [BM] Component Input Binding

- Routenparameter als Input empfangen
- `computed` wandelt ISBN in Buch um (weil der Service das synchron liefert)
- Argumentation: Detailkomponente hat keine Abhängigkeit zu ActivatedRoute mehr

### [THEORIE] HTTP

- fetch in der Theorie erläutern
- HttpClient erläutern, Vorteile nennen: in Angular integriert, mit DI mockbar beim Testing, Interceptors, … (?)
- … aber gerne auch klar sagen, dass es auch okay ist, wenn man die Angular-Lösung nicht nutzt und lieber fetch nimmt
- hier noch keine Resource

### [BM] Daten laden mit HTTP

- BookList: `getAll().subscribe()` und `books.set()`
- Detailseite: Effect reagiert auf geänderte ISBN, `getSingle(this.isbn()).subscribe()` und `book.set()`

### [BM] Buch löschen

- Buch löschen auf der Detailseite, HTTP direkt in dieser Komponente
  - könnten wir auch weglassen, aber:
  - 1.) Wir lernen Router.navigate kennen
  - 2.) ist ein Anwendungsfall, der keine Daten zur Anzeige abruft, sondern eine Aktion ausführt. Das kann man niemals durch Resource, toSignal oder AsyncPipe ersetzen
  - 3.) Löschen ist gut, damit die Buchliste nicht vollmüllt

### [THEORIE] Resource


### [BM] Resource

- **Buchliste:** laden mit HttpResource (wird von Service generiert), Ladeindikator mit `isLoading()` und Reload-Button
- **Detailseite:**
  - HttpResource mit Request, ganzes Signal übergeben: `this.#service.getSingle(this.isbn)`
  - Link zu anderer Detailseite (statische ISBN), damit deutlich wird, dass der erneute Request funktioniert. Diskutieren, dass die ISBN natürlich später aus der Datenbank o.Ä. kommen sollte


### [THEORIE] Pipes

### [BM] Pipes

- Tabelle mit allen Pipes zeigen
- ein paar wichtige Pipes erläutern: DatePipe, DecimalPipe, CurrencyPipe, JsonPipe
- Exkurs: Sprache einstellen (`LOCALE_ID`)


### [THEORIE] Forms

whatever it will be

### [BM] Forms Buch anlegen

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
- 1.) Suche mit HTTP
  - existierende HttpResource bekommt `searchTerm` als Request übergeben, wie bei `getSingle()` mit der ISBN
  - lokales `filteredBooks` kommt weg, im Template direkt auf `books.value()` gehen
- 2.) Suchbegriff als Query-Parameter
  - `searchTerm` wird ein LinkedSignal, denn wir wollen a) es direkt setzen (aus dem Formular) und b) es auf Basis eines anderen Signals setzen (`this.search`)
  - `this.search` ist Input mit Component Input Binding
  - Effect mit `Router.navigate([], { queryParams: { search: this.searchTerm() } })`

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

### XX RxJS Richtige Suche

- Typeahead-Suche mit HTTP auf der Startseite (komplett separat von der Buchliste)
- übliches RxJS-Beispiel, gerne mit FormControl und valueChanges (falls es sowas dann noch gibt)
- toSignal sollte hier vorkommen

### Was mir noch fehlt

- Pipes: eingebaute und auch eine kleine eigene Pipe (ISBN-Pipe, Shorten-Pipe, um Description nach X Zeichen abzuschneiden und mit "…" zu kürzen)
- \[class\]/\[style\]
- eigener Validator: müssen aber abwarten, was mit Forms passiert
- NgOptimizedImage
