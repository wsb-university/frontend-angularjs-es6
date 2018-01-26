import {AddContactComponent} from './add.component';

export const addContactModule = angular
  .module('app.contacts.add', [])
  .component('addContact', new AddContactComponent());
