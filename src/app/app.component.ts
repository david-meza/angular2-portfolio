/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

import {Home} from './home';
import {AppState} from './app.service';
import {RouterActive} from './router-active';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    `
    md-toolbar h1 {
      color: rgba(255, 255, 255, 0.87);
      font-size: 18px;
    }

    app {
      height: 100%;
      display: block;
    } 

    body, html {
      height: 100%;
      width: 100%;
      padding: 0;
      margin: 0;
    }
  `],
  template: `
    <md-toolbar color="primary">
      <h1>{{ name }}</h1>
    </md-toolbar>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
])
export class App {
  public name = 'David Meza';
  public url = 'https://github.com/david-meza/angular2-portfolio';

  constructor(public appState: AppState) {}

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
