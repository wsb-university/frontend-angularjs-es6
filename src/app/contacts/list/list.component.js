import {ContactsListController} from './list.controller';
import template from './list.html';
import './list.scss';

export class ContactsListComponent {
  template = template;
  controllerAs = 'list';
  controller = ContactsListController;
}
