import {AddContactController} from './add.controller';
import template from './add.html';
import './add.scss';

export class AddContactComponent {
  template = template;
  controllerAs = 'add';
  controller = AddContactController;
}
