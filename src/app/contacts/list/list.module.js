import angular from 'angular';
import {ContactsListComponent} from './list.component';

export const contactsListModule = angular
  .module('app.contacts.list', [])
  .component('contactsList', new ContactsListComponent());
