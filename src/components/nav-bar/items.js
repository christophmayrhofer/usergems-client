import { bindable } from 'aurelia-framework';

export class Items {
  @bindable router;
  @bindable state

  logout() {
    this.state.auth.logout();
    this.router.navigateToRoute('users');
  }
}