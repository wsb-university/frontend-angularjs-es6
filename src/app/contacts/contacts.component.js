import {ContactsController} from './contacts.controller';
import template from './contacts.html';
import './contacts.scss';

export class ContactsComponent {
  template = template;
  controllerAs = 'contacts';
  controller = ContactsController;
}
