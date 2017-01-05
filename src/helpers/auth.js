import { inject } from 'aurelia-framework';
import store from '../store';

@inject(store)
export default class Auth {
  constructor(state) {
    this.state = state;
    if (this.state.auth) {
      return this.state.auth;
    }

    this.lock = new Auth0Lock('AqbSSDV0WpHXbu0Re4GpvVvJ5sDZqgnh', 'navio.eu.auth0.com');
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

        fetch('http://localhost:3000/initUser', {
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