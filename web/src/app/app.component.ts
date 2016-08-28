/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import {HomeComponent} from './home/home-component';
import {LogEventComponent} from './logevent/logevent-component';
import {ToolbarComponent} from './toolbar/toolbar-component';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ ToolbarComponent ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.css')
  ],
  template: `
  <toolbar></toolbar>
  <main>
    <router-outlet></router-outlet>
  </main>
  `
})
@RouteConfig([
  { path: '/home',  name: 'Home',  component: HomeComponent, useAsDefault: true },
  { path: '/logevent',  name: 'LogEvent',  component: LogEventComponent}
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Appy McAppface';
  url = '';
  testServiceValue: string;
  constructor() {}

  ngOnInit() {}
}
