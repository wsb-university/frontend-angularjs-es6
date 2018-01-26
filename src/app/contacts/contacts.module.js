import {module} from 'angular';
import {ContactsComponent} from './contacts.component';

export const contactsModule = module('app.contacts', [])
  .component('contacts', new ContactsComponent());
