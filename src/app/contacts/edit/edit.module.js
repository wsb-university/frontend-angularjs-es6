import angular from 'angular';
import {EditContactComponent} from './edit.component';

export const editContactModule = angular
  .module('app.contacts.edit', [])
  .component('editContact', new EditContactComponent());
