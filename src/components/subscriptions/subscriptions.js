import { inject } from 'aurelia-framework';
import config from '../../config';
import state from '../../store';

@inject(config, state)
export class Subscriptions {
  newSubscriptionUser = '';
  usernameSuggestions = [];

  constructor(config, state) {
    this.config = config;
    this.state = state;
    this.fetchUserSubscriptions();
  }

  async addSubscription() {
    await fetch(`${this.config.apiUrl.private}addSubscription`, {
      method: 'POST',
      body: this.newSubscriptionUser,
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      },
    });
    this.fetchUserSubscriptions();
  }

  async fetchUserSubscriptions() {
    this.state.loading = true;
    const response = await fetch(`${this.config.apiUrl.private}getUserSubscriptions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      },
    });
    this.state.subscriptions = await response.json();
    this.state.loading = false;
  }

  async deleteSubscription(id) {
    this.state.loading = true;
    await fetch(`${this.config.apiUrl.private}deleteSubscription?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      },
    });
    this.fetchUserSubscriptions();
    this.state.loading = false;
  }

  async usernameAutocomplete() {
    this.usernameSuggestions = [];
    if(this.newSubscriptionUser.length === 0)
      return;
    const response = await fetch(`${this.config.apiUrl.public}getUsernames?username=${this.newSubscriptionUser}`);
    const users = await response.json();
    this.usernameSuggestions = users.map(user => user.username);
  }

  selectUsername(username) {
    this.newSubscriptionUser = username;
    this.usernameSuggestions = [];
  }
}
