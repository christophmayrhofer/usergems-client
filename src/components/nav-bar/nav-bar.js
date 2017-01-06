import { inject, bindable } from 'aurelia-framework';
import state from '../../store';

@inject(state)
export class NavBar {
  @bindable router;

  constructor(state) {
    this.state = state;
  }

  attached() {
    $(".button-collapse").sideNav({closeOnClick: true});
  }
}
