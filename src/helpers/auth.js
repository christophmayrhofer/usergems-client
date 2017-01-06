import { inject } from 'aurelia-framework';
import config from '../config';
import state from '../store';

@inject(config, state)
export default class Auth {
  constructor(config, state) {
    this.config = config;
    this.state = state;
    if (this.state.auth) {
      return this.state.auth;
    }

    this.lock = new Auth0Lock(this.config.auth.clientId, this.config.auth.domain);
    this.state.auth = this;
    return this;
  }

  login() {
    this.lock.show((err, profile, token) => {
      if (err) {
        console.log(err);
      } else {
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', token);
        this.state.user = profile;

        fetch(`${this.config.apiUrl.private}initUser`, {
          method: 'POST',
          body: JSON.stringify(profile),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('id_token')}`,
          },
        });
      }
    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.state.user = null;
  }
}