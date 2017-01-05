import { inject } from 'aurelia-framework';
import store from './store';

@inject(store)
export default class App {
  constructor(state) {
    this.state = state;
    this.state.user = JSON.parse(localStorage.getItem('profile'));
    this.state.apiUrl = 'http://localhost:3000/';
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Usergems Twitter';
    config.map([
      { route: ['', 'home'],       name: 'home',       moduleId: 'components/home/home', title: 'Home', nav: true },
      { route: 'feed',    name: 'subscriptions',       moduleId: 'components/feed/feed', title: 'Feed', nav: true },
      { route: 'subscriptions',    name: 'subscriptions',       moduleId: 'components/subscriptions/subscriptions', title: 'Subscriptions', nav: true },
    ]);

    config.mapUnknownRoutes('components/not-found/not-found');
  }
}
