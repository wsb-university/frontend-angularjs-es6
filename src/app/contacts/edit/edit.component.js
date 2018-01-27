import {EditContactController} from './edit.controller';
import template from './edit.html';
import './edit.scss';

export class EditContactComponent {
  template = template;
  controllerAs = 'edit';
  controller = EditContactController;
}
