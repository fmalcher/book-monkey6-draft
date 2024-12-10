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

- Ein Kapitel muss nicht immer ein ganzes Thema abdecken, sondern Themen**teile** sind auch okay. Das ist dann möglich: Kapitel zu HTTP mit fetch und HttpClient. Weiteres Kapitel zur Resource API, in der wir aber auch HTTP machen.
- Es gibt BM-Schritte, die eine vorherige Lösung refactoren. Deshalb sollte jeder BM-Schritt einen eigenen Mini-Monkey bekommen. Es gibt dann also nicht mehr pro Kapitel genau einen Monkey, sondern vielleicht mehrere.
- Datenmodell vereinfachen
- Forms nur noch Create

### 1 Buchliste

- BookListComponent mit statischen Büchern
- Interface Book
  - kein Datum
  - optionales Feld? Brauchen wir für `@if`
  - createdAt
- Signal für die Buchliste
- Template-Syntax: Interpolation, for, if

### 2 Property Bindings Item-Komponente

- Listen-Template aus BookList in Item-Komponente auslagern
- @let verwenden, damit wir nicht überall bei `book` die Klammern hinzufügen müssen: `@let b = book();`
- for bleibt im Container, Property Binding für einzelne Bücher
- input()

### 3 Event Binding Favoritenliste

- lokale Favoritenliste in der BookList
- Item bekommt Button, Event nach oben zum Container werfen
- im Container wird Favoritenliste gesammelt und (ganz einfach) angezeigt
- Immutability (aktualisieren der lokalen Liste)
- Button zum Leeren der Liste (sonst ist es mit 2 Büchern doof zu bedienen)
- output()
- Favoriten im LocalStorage persistieren

### 4 Service mit statischen Büchern

- statische Buchliste aus BookList verschieben in neuen BookStoreService
- in BookList: `this.books.set(this.service.getAll())`

### 5 Lokaler Filter mit computed

- rein lokale Suche in der Buchliste
- Eingabefeld, das mit Event ein Signal searchTerm setzt
- computed rechnet aus der Buchliste und dem Suchbegriff eine gefilterte Liste aus, die angezeigt wird

### 6 Routing mit lokaler Buchliste

- Buchliste und Detailseite, HomeComponent (brauchen wir nicht unbedingt, ist aber nachher für Lazy Loading strategisch gut)
- RouterOutlet platzieren, Routen definieren (separate booksRoutes), Links setzen
- Navigationsleiste in AppComponent (Home, Books, Admin)
- Detailseite bauen
  - Parameter mit ActivatedRoute synchron abfragen
  - BookStoreService.getSingle() sucht synchron in lokaler Liste, dann `this.book.set()`


### 7 Component Input Binding

- Routenparameter als Input empfangen
- computed wandelt ISBN in Buch um (weil der Service das synchron liefert)
- Argumentation: Detailkomponente hat keine Abhängigkeit zu ActivatedRoute mehr

### 8 Daten laden mit HTTP (fetch)

- fetch in der Theorie erläutern (damit Danny glücklich ist ;-) )
- HttpClient erläutern, Vorteile nennen: in Angular integriert, mit DI mockbar beim Testing, Interceptors, … (?)
- … aber gerne auch klar sagen, dass es auch okay ist, wenn man sich der Angular-Lösung verweigert und lieber fetch nimmt
- Wenn notwendig, könnten wir auch den ersten praktischen HTTP-Request mit fetch machen. Ich sehe aber keinen guten Grund, dann nicht sofort auf HttpClient umzusteigen
- BookList: `getAll().subscribe()` und `books.set()` 
- Detailseite: Effect reagiert auf geänderte ISBN, `getSingle(this.isbn()).subscribe()` und `book.set()` 
- Buch löschen auf der Detailseite, HTTP direkt in dieser Komponente
  - könnten wir auch weglassen, aber:
  - 1.) Wir lernen Router.navigate kennen
  - 2.) ist ein Anwendungsfall, der keine Daten zur Anzeige abruft, sondern eine Aktion ausführt. Das kann man niemals durch Resource, toSignal oder AsyncPipe ersetzen
  - 3.) Löschen ist gut, damit die Buchliste nicht vollmüllt


### 9 Daten laden mit HTTP und Resource

- Buchliste: laden mit (rx)Resource, Ladeindikator mit `isLoading()` und Reload-Button
- Detailseite:
  - Resource mit Request ( `this.isbn` )
  - ggf. Link zu anderer Detailseite, damit deutlich wird, dass der erneute Request funktioniert
- Falls irgendwann eine httpResource kommt, nehmen wir natürlich die
- Diskussionspunkt: gleich rxResource nehmen oder fetch+resource benutzen?

### 10 Pipes



### 11 Forms Buch anlegen

- Feature `admin` mit eigener Routendatei
- Komponenten BookForm und BookCreate
- wir machen zwar kein Bearbeiten mehr, aber das kann eine gute Zusatzaufgabe für die Leser sein. Deswegen Komponententrennung berücksichtigen und auch diskutieren
- Servicemethode `create()` bauen
- verdrahten: Route auf BookCreate, dort BookForm einbinden
- Formular bauen in BookForm
- mit dynamischen Autorenfeldern, aber ohne Published-Datum

### 12 Lazy Loading (oder anderer Titel?)

- in Theorie auch `@defer` erwähnen?
- Features `admin` und `books` lazy laden
- ggf. Default Export für Routes-Array nutzen
- bei mehreren Features sehr eindrucksvoll sichtbar, deshalb brauchen wir das admin-Feature
- HomeComponent auch sinnvoll, weil dann beim Start noch kein Lazy-Feature geladen ist

### XX RxJS Richtige Suche

- Typeahead-Suche mit HTTP auf der Startseite (komplett separat von der Buchliste)
- übliches RxJS-Beispiel, gerne mit FormControl und valueChanges (falls es sowas dann noch gibt)
- toSignal sollte hier vorkommen

### Was mir noch fehlt

- Pipes: eingebaute und auch eine kleine eigene Pipe (ISBN-Pipe, Shorten-Pipe, um Description nach X Zeichen abzuschneiden und mit "…" zu kürzen)
- \[class\]/\[style\]
- eigener Validator: müssen aber abwarten, was mit Forms passiert
- linkedSignal: praktisch weglassen, wenn wir dafür nicht einen wirklich sinnvollen Usecase finden.
- @defer
- NgOptimizedImage
