import { inject } from 'aurelia-framework';
import Auth from './helpers/auth';
import config from './config';
import state from './store';

@inject(config, state)
export class App {
  constructor(config, state) {
    this.config = config;
    this.state = state;
    this.state.user = JSON.parse(localStorage.getItem('profile'));
    this.state.auth = new Auth(this.config, this.state);
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Usergems Twitter';
    config.map([
      { route: ['', 'home/:username?'],       name: 'home',       moduleId: 'components/home/home', title: 'Home', nav: true },
      { route: 'feed',    name: 'subscriptions',       moduleId: 'components/feed/feed', title: 'Feed', nav: true },
      { route: 'subscriptions',    name: 'subscriptions',       moduleId: 'components/subscriptions/subscriptions', title: 'Subscriptions', nav: true },
    ]);

    config.mapUnknownRoutes('components/not-found/not-found');
  }
}
