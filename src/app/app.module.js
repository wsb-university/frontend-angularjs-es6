import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import {AppComponent} from './app.component';
import {contactsModule} from './contacts/contacts.module';

const materialConfig = $mdThemingProvider => {
  $mdThemingProvider.theme('default');
};

export const appModule = angular
  .module('app', [
    uiRouter,
    'ngMaterial',
    contactsModule.name
  ])
  .component('app', new AppComponent())
  .config(materialConfig);
