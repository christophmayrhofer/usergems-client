import { inject } from 'aurelia-framework';
import config from '../../config';
import state from '../../store';

@inject(config, state)
export class Users {
  searchUser = '';
  lastSearchUser = '';
  usernameSuggestions = [];

  constructor(config, state){
    this.config = config;
    this.state = state;
  }

  activate(params) {
    if(typeof params !== 'undefined' && params.username !== 'undefined') {
      this.searchUser = params.username;
    } else if(typeof this.state.user !== 'undefined') {
        this.searchUser = this.state.user.username;
    } else{
      this.searchUser = '';
    }
    this.fetchUserTweets();
  }

  async fetchUserTweets() {
    this.state.loading = true;
    const response = await fetch(`${this.config.apiUrl.public}getUserTweets?username=${this.searchUser}`);
    this.state.tweets = await response.json();
    this.lastSearchUser = this.searchUser;
    this.state.loading = false;
  }

  async usernameAutocomplete() {
    this.usernameSuggestions = [];
    if(this.searchUser.length === 0)
      return;
    const response = await fetch(`${this.config.apiUrl.public}getUsernames?username=${this.searchUser}`);
    const users = await response.json();
    this.usernameSuggestions = users.map(user => user.username);
  }

  selectUsername(username) {
    this.searchUser = username;
    this.fetchUserTweets();
    this.usernameSuggestions = [];
  }
}