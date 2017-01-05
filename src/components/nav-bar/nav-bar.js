import { inject, bindable } from 'aurelia-framework';
import Auth from '../../helpers/auth';
import store from '../../store';

@inject(store)
export class NavBar {
  @bindable router;

  constructor(state) {
    console.log(this.router);
    this.state = state;
    this.auth = new Auth(this.state);
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.state.user = null;
  }
}
