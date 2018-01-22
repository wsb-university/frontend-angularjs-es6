import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import {AppComponent} from './app.component';

const materialConfig = $mdThemingProvider => {
  $mdThemingProvider.theme('default');
};

export const appModule = angular
  .module('app', [
    uiRouter,
    'ngMaterial',
  ])
  .component('app', new AppComponent())
  .config(materialConfig);
