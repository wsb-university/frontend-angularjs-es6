# AngularJS z ES6

Aby rozpocząć projekt sklonujemy repozytorium zawierające podstawową konfigurację do budowy aplikacji oraz zainstalujemy niezbędne zależności:

```
git clone git@github.com:wsb-university/frontend-angularjs-es6.git
cd frontend-angularjs-es6
npm install
```

Repozytorium zawiera podstawową konfigurację, która pozwoli nam rozpocząć tworzenie aplikacji z użyciem frameworku [AngularJS](https://angularjs.org) w standardzie EcmaScript6 języka JavaScript.

## Narzędzia

Narzędziem służącym do budowy aplikacji będzie [Webpack](https://webpack.js.org).

Do transpilacji kodu napisanego w ES6 użyjemy narzędzia o nazwie [Babel](https://babeljs.io/).

Do stylowania aplikacji posłużymy się preprocesorem CSS [SCSS](http://sass-lang.com).

## Struktura aplikacji

Po sklonowaniu repozytorium i przejściu do nowoutworzonego katalogu `frontend-angularjs-es6` widzimy podstawową strukturę aplikacji którą będziemy rozwijać. Biznesowo aplikacja będzie książką telefoniczną, do której użytkownik będzie mógł tworzyć kontakty zawierające imię oraz numer telefonu.

Szkietet aplikacji został utworzony wcześniej, aby nie powielać zadań z innych zajęć. Skupimy się wyłącznie na implementacji Modułów, Komponentów, Kontrolerów aplikacji.

Struktura projektu jest bardzo rozbudowana jak na tak podstawową aplikację, natomiast podczas pisania projektów w ES6 dobrą i często spotykaną praktyką jest deklarowanie każdej klasy bądź modułu aplikacji w oddzielnym pliku.

```
.
├── README.md
├── package.json
├── src
│   ├── app
│   │   ├── app.component.js
│   │   ├── app.controller.js
│   │   ├── app.html
│   │   ├── app.module.js
│   │   ├── app.scss
│   │   └── contacts
│   │       ├── add
│   │       │   ├── add.component.js
│   │       │   ├── add.controller.js
│   │       │   ├── add.html
│   │       │   ├── add.module.js
│   │       │   └── add.scss
│   │       ├── contacts.component.js
│   │       ├── contacts.controller.js
│   │       ├── contacts.html
│   │       ├── contacts.module.js
│   │       ├── contacts.routing.js
│   │       ├── contacts.scss
│   │       ├── contacts.service.js
│   │       ├── edit
│   │       │   ├── edit.component.js
│   │       │   ├── edit.controller.js
│   │       │   ├── edit.html
│   │       │   ├── edit.module.js
│   │       │   └── edit.scss
│   │       └── list
│   │           ├── list.component.js
│   │           ├── list.controller.js
│   │           ├── list.html
│   │           ├── list.module.js
│   │           └── list.scss
│   ├── index.html
│   ├── main.js
│   └── style.scss
└── webpack.config.js
```

## Pliki wejściowe

W katalogu `src` znajdują się trzy pliki, będące plikami wejściowymi aplikacji oraz katalog o nazwie `app` zawierający moduł najwyższego poziomu, który będzie głównym modułem importującym pozostałe części aplikacji.

Pliki wejściowe definiujące podstawowe funkcje aplikacji takie jak główny szablon HTML, import zewnętrznych bibliotek oraz start głównego modułu aplikacji zostały wcześniej zaimplementowane, gdyż na tym etapie nie powinny stanowić dla nikogo wyzwania.

## Architektura aplikacji

Architektura aplikacji opiera się na modułach Angulara.

**Moduł** to obiekt JavaScript definiujący komponenty, serwisy oraz konfigurację.

**Serwis** to klasa bądź funkcja współdzielona pomiędzy kontrolerami w danym module.

**Komponent** to klasa która łączy szablon (template), czyli plik HTML z odpowiadającym jej kontrolerem oraz definiująca tak zwany selektor dla nowego tagu HTML.

Zależności pomiędzy poszczególnymi częściami aplikacji przedstawić można w łatwy sposób poniższym diagramem:

```
 module
 ├── component
 │   ├── controller
 │   └── template
 ├── config
 └── service
```

# Główny moduł aplikacji

Główny moduł aplikacji został zadeklarowany w pliku `app.module.js` i definiuje podstawowe zależności aplikacji oraz komponent o nazwie `AppComponent` definiujący tylko szablon aplikacji.

Po uruchomieniu aplikacji poprzez polecenie `npm run dev` w Terminalu i przejściu w przeglądarce pod wskazany przez polecenie adres (domyślnie `localhost:8080`) zobaczymy tylko tekst **app works!**.

# Implementacja modułu `contactsModule`

Moduły Angulara tworzymy funkcją o nazwie `module` dostępną w objekcie `angular`.

Aby zadeklarować nowy moduł Angulara należy użyć funkcji `module`, którą zaimportujemy do pliku `contacts.module.js` dodać linijkę:

```
import {module} from 'angular';
```

W powyższym imporcie wykorzystaliśmy nowy mechanizm w JavaScript zdefiniowany w standardzie ES6 zwany *dekompozycją obiektu*. Dekompozycja polega na wyłuskaniu z obiektu jego elementów.

Funkcja `module` jest dostępna w głównym obiekcie Angulara o nazwie `angular` i powyższe wywołanie jest analogiczne do:
```
import angular from 'angular';
const module = angular.module;
```

Powyższe linie kodu, tak samo jak wspomniany import dodają do pliku w którym zostały zaimplementowane funkcję o nazwie `module`, którą możemy następnie wywołać i przypisać jej wartość do zmiennej, która zostanie wyeksportowana z obecnego pliku, aby można ją było zaimportować w innym:

```
export const contactsModule = module('app.contacts', []);
```

Następnie w głównym module naszej aplikacji możemy zaimportować nowo utworzony moduł i dodać go jako zależność głównego modułu aplikacji w pliku `app.module.js`:

```
import {contactsModule} from './contacts/contacts.module';
…
  .module('app', [
    uiRouter,
    'ngMaterial',
    contactsModule.name,
  ])
…
```

## Komponent

Utworzony moduł posłuży do stworzenia nowego komponentu, który będzie dostępny w kodzie HTML pod tagiem `<contacts>`. Szablon tego komponentu został już wstępnie zaimplementowany, skupimy się natomiast na implementacji samego komponentu oraz jego kontrolera.

Implementacja komponentu sprowadza się do definicji pojedynczej klasy z trzema polami:
```
import ContactsController from './contacts.controller';
import template from './contacts.html';
import './contacts.scss';

export class ContactsComponent {
  template = template;
  controllerAs = 'contacts';
  controller = ContactsController;
}
```

Klasy zostały dodane do JavaScript w wersji ES6 i służą do definiowania objektów. Objekty klas tworzy się słowem kluczowym `new`. Wywołanie `new ContactsComponent` utowrzy następujący objekt:
```
{
  template: '<div layout="column" layout-fill><md-toolbar><div class="md-toolbar-tools">…'
  controllerAs: 'contacts';
  controller: function() {…}
}
```

Obiekt powstanie poprzez zamianę zmiennych które zostały wcześniej zaimportowane w pliku z deklaracją klasy.

## Kontroler

Kontroler kontaktów aplikacji zdefiniujemy róznież używając tworząc klasę w pliku `contacts.controller.js`:
```
export class ContactsController {}
```

Kod ten wyeksportuje z pliku pustą klasę o nazwie `ContactsController`.

Gdy kontroler dla komponentu jest gotowy możemy go użyć w głównym szablonie aplikacji w pliku `app.html` zastępując całą jego zawartość linijką:
```
<contacts></contacts>
```

Po przejściu do przeglądarki zobaczymy znany z Angular Material toolbar z przyciskiem nawigujacym do listy kontaktów oraz przycisk, który będzie służył do dodawania kontaktów. Motyw kolorystyczny możemy edytować w pliku `app.module.js` w funkcji o nazwie `materialConfig` w sposób analogiczny do przedstawionego na wcześniejszych zajęciach, np:
```
  $mdThemingProvider
    .theme('default')
    .primaryPalette('purple')
    .accentPalette('light-green')
    .warnPalette('red')
    .backgroundPalette('teal');
```

## Lista kontaktów

Gdy szkielet listy kontaktów jest już gotowy możemy przejść do implementacji komponentu właściwej listy. Implementacja będzie przebiegać w sposób analogiczny, tj. zadeklarujemy moduł, komponent oraz kontroler dla widoku listy.

W pliku `list.module.js` stworzymy moduł listy kontaktów:
```
import angular from 'angular';
import {ContactsListComponent} from './list.component';

export const contactsListModule = angular
  .module('app.contacts.list', [])
  .component('contactsList', new ContactsListComponent());
```

Następnie wymagany przez niego komponent:
```
import {ContactsListController} from './list.controller';
import template from './list.html';
import './list.scss';

export class ContactsListComponent {
  template = template;
  controllerAs = 'list';
  controller = ContactsListController;
}
```

oraz kontroler do obsługi logiki listy kontaktów:
```
export class ContactsListController {}
```

Na koniec zaimportujemy cały moduł do moduły kontaktów oraz dodamy jako submoduł:
```
import {contactsListModule} from './list/list.module';
…
export const contactsModule = module('app.contacts', [
  contactsListModule.name,
])
```

# Routing

Aby użyć nowo powstałego komponentu możemy umieścić jego tag `<contacts-list>` wewnątrz tagu `<md-content>` w pliku `contacts.html`
```
…
  <md-content>
    <contacts-list></contacts-list>
    <ui-view></ui-view>
…
```

Kontroler komponentu nie ma jeszcze zaimplementowanej żadnej funkcjonalności, dlatego lista nie będzie jeszcze funkcjonowała w należyty sposób, natomiast już na tym etapie wiemy, że widok listy nie będzie jedynym widokiem naszej aplikacji, dlatego już teraz powinniśmy zadbać o implementację tak zwanego **routingu**, czyli trasowania dla naszej aplikacji.

Routing to mechanizm służący do zmiany widoków aplikacji w zależności od adresu URL odwiedzonego w przeglądarce.

Wszystkie widoki w aplikacji będą widokami częściowymi modułu kontaktów, tj. istniejący już moduł listy oraz moduły służące do dodawania oraz edycji kontaktów, dlatego routing zaimplementujemy w pliku `contacts.routing.js`

```
export const routing = ($urlRouterProvider, $locationProvider, $stateProvider) => {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/contacts/list');

  $stateProvider.state({
    name: 'list',
    url: '/contacts/list',
    component: 'contactsList',
  })
}
```

Funkcja routing przyjmuje w tym momencie parametry o specjalnych nazwach: `$urlRouterProvider`, `$locationProvider`, `$stateProvider`. Każdy z tych parametrów to obiekt konfiguracyjny odpowiadający za konfigurację poszczególnych zadań związanych z routingiem:

- `$stateProvider` odpowiada za definiowanie stanów routera; wywołanie na nim metody `state` z parametrem będącym obiektem z polami opisującymi nazwę danego stanu, jego URL oraz komponent, który powinien zostać załadowany gdy aplikacja natrafi na daną ścieżkę.

- `$urlRouterProvider` służy do zdefiniowania domyślnej ścieżki na którą aplikacja powinna być przekierowana jeśli obecna ścieżka nie została zdefiniowana

- `$locationProvider` służy do włączenia obsługi [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) obsługiwanego przez nowoczesne przeglądarki

Po zaimplementowaniu konfiguracji routera Angulara możemy go użyć w module `contacts.module.js`:
```
import {routing} from './contacts.routing';
…
])
  .component('contacts', new ContactsComponent())
  .config(routing);
```

## Dodawanie kontaktów

Po zaimplementowaniu obsługi wielu widoków w aplikacji, kolejnym krokiem będzie dodanie kolejnego widoku.

W sposób analogiczny do wcześniejszych stworzymy moduł, komponent oraz kontroler służący do obsługi dodawania kontaktów.

Moduł:
```
import {AddContactComponent} from './add.component';

export const addContactModule = angular
  .module('app.contacts.add', [])
  .component('addContact', new AddContactComponent());
```

Komponent:
```
import {AddContactController} from './add.controller';
import './add.scss';
import template from './add.html';

export class AddContactComponent {
  template = template;
  controllerAs = 'add';
  controller = AddContactController;
}
```

Kontroler:
```
export class AddContactController {}
```

Następnie musimy pamiętać o imporcie i deklaracji modułu w module nadrzędnym, tj. `contacts.module.js`:
```
import {addContactModule} from './add/add.module';
…
export const contactsModule = module('app.contacts', [
  contactsListModule.name,
  addContactModule.name,
])
…
```

Na koniec dodamy obsługę ścieżki do nowego komponentu w pliku `contacts.routing.js` w funkcji `routing`:
```
  $stateProvider.state({
    name: 'add',
    url: '/contacts/add',
    component: 'addContact',
  });
```

Teraz po przejściu na zdefiniowany adres w przeglądarce: `/contacts/add` zobaczymy formularz dodawania kontaktu.

Przechodzenie pomiędzy widokami aplikacji poprzez ręczną zmianę w pasku adresu nie jest docelowym rozwiązaniem, dlatego mając teraz zdefiniowane wymagane ścieżki możemy zaimplementować obsługę zdarzeń, które będą zmieniać widoki użytkownika.

W głównym kontrolerze kontaktów (`contacts.controller.js`) zaimplementujemy funkcje służące do zmiany widoków:
```
export class ContactsController {
  constructor($state) {
    this.$state = $state;
  }

  showList = () => {
    this.$state.go('list');
  };

  add = () => {
    this.$state.go('add');
  };
}
```

Metoda `constructor` dla dowolnej klasy pozwala na zdefiniowanie pewnych wartości, które mają zostać wykorzystane przy tworzeniu obiektów tej klasy. W tym przypadku jako argument konstruktora został dodany objekt `$state` służący do obsługi stanu routera. Po przypisaniu go do zmiennej `$state` wewnątrz tej klasy będziemy mogli go używać w innych metodach tej klasy, tj przedstawionej `showList` slużącej do zmiany widoku na widok listy oraz `add` służącej do zmiany widoku na formularz dodawania kontaktów.

Następnie dodamy do szablonu kontaktów (`contacts.html`) obsługę kliknięć przycisków nawigacyjnych. Do przycisku taga przycisku **All contacts** dodamy obsługę kliknięcia wywołującą metodę `showList` naszego kontrolera, natomiast do przycisku typu FAB (Floating Action Button) dodamy wywołanie metody `add`:
```
<md-button class="md-accent" ng-click="contacts.showList()">
  All contacts
</md-button>
…
    <md-button class="md-fab add-fab" ng-click="contacts.add()">
      <md-tooltip md-direction="left">Add new contact</md-tooltip>
      <md-icon>add</md-icon>
    </md-button>

```

# Serwisy

Zanim przejdziemy do implementacji obsługi formularze powinniśmy zadbać o miejsce w którym przechowywane będą kontakty. Do tego celu stworzymy serwis, który będzie współdzielony pomiędzy kontrolerami listy i formularza. W ten sposób te dwie rozłączne części aplikacji będą w stanie wymieniać informacje.

W pliku `contacts.service.js` stworzymy klasę `ContactsService` oraz zaimportujemy metodę `uuid` z pakietu o tej samej nazwie.  Pakiet `uuid` posłuży nam do automatycznego generowania unikalnych identyfikatowów dla tworzonych kontaktów.

```
import {v4 as uuid} from 'uuid';

export class ContactsService {
}
```

Następnie w klasie dodamy dwie metody służące do zapisu i odczytu danych z `localStorage` czyli wbudowanego w przeglądarkę magazynu danych:
```
getState = () => {
  const data = localStorage.getItem(ContactsService.STORAGE_KEY);
  let contacts = [];
  if (data) {
    try {
      contacts = JSON.parse(data);
    } catch (e) {}
  }
  return contacts;
};

keepState = () => {
  localStorage.setItem(
    ContactsService.STORAGE_KEY,
    JSON.stringify(this.contacts),
  );
};
```

Następnie dodamy konstruktor wykorzystujący metodę `getState` oraz metodę służącą do tworzenia kontaktów i dodawania ich do `localStorage` za pomocą metody `keepState`:
```
constructor() {
  this.contacts = this.getState();
}

add = (name, phone) => {
  this.contacts.push({
    id: uuid(),
    name,
    phone,
  });
  this.keepState();
};
```

Dodamy też obsługę kasowania kontaktów, która przyda się w najbliższym czasie:
```
delete = id => {
  const index = this.contacts.map(contact => contact.id).indexOf(id);
  this.contacts.splice(index, 1);
  this.keepState();
};
```

Gdy serwis jest gotowy możemy udostępnić go do użytku dla kontrolerów, dodając w pliku modułu kontaktów `contacts.module.js` jego import oraz definicję uzycia:
```
import {ContactsService} from './contacts.service';
…
])
  .config(routing)
  .component('contacts', new ContactsComponent())
  .service('contactsService', ContactsService);
```

Gdy jest on już dostępny dla modułu kontaktów oraz jego submodułów możemy zaimplementować obsługę listy kontaktów do instniejących kontrolerów.

W pliku `list.controller.js` dodamy konstruktor oraz następujące metody:
```
constructor($state, contactsService) {
  this.$state = $state;
  this.contactsService = contactsService;
  this.contacts = contactsService.contacts;
}

edit = contact => {
  this.$state.go('edit', {
    id: contact.id,
  });
};

delete = id => {
  this.contactsService.delete(id);
};
```

Metoda `delete` wykorzysta utworzony wcześniej serwis do skasowania wybranego elementu, metoda `edit` posłuży do przekierowania użytkownika na widok edycji, który dodamy później, natomiast w konstruktorze przypiszemy pola objektu klasy, których będziemy używać.

Po implementacji kontrolera możemy dodać obsługę wywołań metod oraz iterację po liście kontaktów w szablonie `list.html`:
```
<md-list-item ng-repeat="contact in list.contacts | orderBy:'name'">
…
<md-button class="md-accent" ng-click="list.edit(contact)">
…
<md-button class="md-warn" ng-click="list.delete(contact.id)">
```

## Kontroler formularza

Formularz posiada dwa pola tekstowe służące do przechwytywania imienia oraz numeru telefonu dla naszego kontaktu. Modelem danych dla tych pól będą dwie zmienne o nazwach `name` oraz `phone`. Formularz po wysłaniu będzie wykorzystywał serwis `contactsService` do zapisania kontaktu oraz używany wcześniej serwis `$state` służący do powrotu do widoku listy po pomyślnym dodaniu kontaktu. Implementacja opisanej funkcjonalności wygląda następująco:
```
export class AddContactController {
  name = '';
  phone = '';

  constructor(contactsService, $state) {
    this.contactsService = contactsService;
    this.$state = $state;
  }

  add = () => {
    this.contactsService.add(this.name, this.phone);
    this.$state.go('list');
  };

  back = () => {
    this.$state.go('list');
  };
}
```

Po zakończeniu implementacji możemy powiązań utworzone pola i metody z elementami HTML w szablonie:
```
<form ng-submit="add.add()">
…
<input type="text" ng-model="add.name">
…
<input type="text" ng-model="add.phone">
…
<md-button type="submit" class="md-primary" ng-click="add.add()">
…
<md-button type="reset" class="md-warn" ng-click="add.back()">
…
```

Możemy teraz przez naszą aplikację dodawać nowe kontakty, a także dzięki wcześniejszej implementacji metody `delete` w kontrolerze listy kasować istniejące kontakty, a dzięki użyciu mechanizmu `localStorage` kontakty nie są tracone po odświerzeniu przeglądarki.

## Edycja istniejących kontaktów

Ostatnim krokiem w budowie aplikacji będzie dodanie możliwości edycji kontaktów.

Należy teraz w sposób analogiczny do wcześniejszego dodać kolejno moduł, komponent, kontroler oraz wpis w routerze a następnie w kontrolerze zaimplementować obsługę edycji.

Moduł:
```
import angular from 'angular';
import {EditContactComponent} from './edit.component';

export const editContactModule = angular
  .module('app.contacts.edit', [])
  .component('editContact', new EditContactComponent())
```

Komponent:
```
import {EditContactController} from './edit.controller';
import template from './edit.html';
import './edit.scss';

export class EditContactComponent {
  template = template;
  controllerAs = 'edit';
  controller = EditContactController;
}
```

Router:
```
$stateProvider.state({
  name: 'edit',
  url: '/contacts/edit/:id',
  component: 'editContact',
});
```

Implementacja wpisu routera różni się nieco od wcześniejszych tym, że jako ostatnia sekcja adresu URL został dodany specjalny znacznik mówiący o tym, że w tym miejscu adresu dodana będzie wartość dostępna później pod zmienną o nazwie `id`.

## Dziedziczenie

Kontroler:
```
export class EditContactController {}
```

Kontroler służący do obsługi formularza edycji również będzie odbiegał od pozostałych. Przed rozpoczęciem implementacji kontrolera przechodząc w aplikacji do widoku edycji możemy zaobserwować, że wiele elementów widoku pokrywa się z widokiem dodawania kontaktów. Mając tę wiedzę możemy posłużyć się kolejnym ważnym mechanizmem dostępnym w ES6 jakim jest dziedziczenie. Wykorzystamy część kodu istniejącej już klasy w definiwanej obecnie klasie.

Aby wykorzystać część kodu z klasy `AddContactController` musimy ją zaimportować w pliku `edit.controller.js`, a następnie używając słowa kluczowego `extends` rozszerzyć wcześniejszą klasę o nowe funkcjonalności.

```
import {AddContactController} from '../add/add.controller';

export class EditContactController extends AddContactController {
}
```

Następnie definiując konstruktor przekażemy mu wymagane parametry:
```
  constructor(contactsService, $state, $location, $stateParams, $scope) {
```

ale zamiast przypisywać je wszystkie po kolei wywołamy funkcję o nazwie `super`, która służy do odwołania się do klasy nadrzędnej po której obecna klasa dziedziczy. Zaoszczędzi nam to kolejnych przypisań, ponieważ zmienne `contactsService`, `$scope` a także dwie zmienne będące modelem danych dla pól formularza zostaną stworzone automatycznie dzięki dziedziczeniu.

```
    super(contactsService, $state);
    this.$stateParams = $stateParams;
    this.$scope = $scope;
  }
```

Następnie należy dodać obsługę pobierania parametru identyfikującego kontakt z adresu URL oraz przypisywania odpowiednich danych do zmiennych modelowych formularze:
```
$onInit = () => {
  this.id = this.$stateParams.id;
  const contacts = this.contactsService.contacts;
  this.index = contacts.map(contact => contact.id).indexOf(this.id)
  this.backup = contacts[this.index];

  this.name = contacts[this.index].name;
  this.phone = contacts[this.index].phone;
}
```

Metoda o nazwie `$onInit` jest specjalną, zarezerwowaną przez angulara metodą, która zostaje automatycznie wykonana w momencie kiedy komponent zostanie zainicjowany. Dzięki temu możemy skorzystać z dodanego w konstruktorze objektu `$stateParams` służącego do pobierania danych z adresu URL. Następnie na podstawie pobranego identyfikatora z listy kontaktów wybierany jest odpowiedni obiekt, a jego pola są przypisywane do pól modelu danych formularze. W międzyczasie dane o kontakcie są też zapisywane do zmiennej o nazwie backup, abyśmy byli w stanie je odtworzyć kiedy użytkownik zdecyduje przerwać edycję bez zapisywania zmian.

Następnie możemy dodać obsługę wysłania formularza oraz przywrócenia początkowych danych poniższymi metodami:
```
edit = () => {
  this.contactsService.contacts[this.index].name = this.name;
  this.contactsService.contacts[this.index].phone = this.phone;
  this.$state.go('list');
};

reset = () => {
  this.name = this.backup.name;
  this.phone = this.backup.phone;
}
```

Aby formularz działał poprawnie musimy też powiązać metody oraz zmienne z elementami HTML:
```
<form ng-submit="edit.edit()">
…
<input type="text" ng-model="edit.name">
…
<input type="tel" ng-model="edit.phone">
…
<md-button type="submit" class="md-primary" ng-click="edit.edit()">
…
<md-button class="md-accent" ng-click="edit.reset()">
…
<md-button type="reset" class="md-warn" ng-click="edit.back()">
```

Po przejściu na widok edycji pola formularza powinny być wypełnione odpowiednimi danymi.

## Wdrożenie aplikacji

Aplikację możemy docelowo rozbudować o możliwość komunikacji z API, które będzie zapisywało stan notatek na serwerze, bądź wdrożyć w obecnej postaci na produkcję budując ją poleceniem `npm run build` a następnie wywołując polecenie `now` w katalogu `dist`.
