import { inject } from 'aurelia-framework';
import config from '../../config';
import state from '../../store';

@inject(config, state)
export class Feed {
  newTweetText = '';

  constructor(config, state){
    this.config = config;
    this.state = state;
  }

  attached() {
    $('#newTweetText').characterCounter();
    this.state.loading = true;
    this.fetchFeed()
    this.fetchInterval = setInterval(() => this.fetchFeed(), this.config.feedPollInterval);
    console.log('Start polling: ' + this.config.feedPollInterval);
  }

  detached() {
    clearInterval(this.fetchInterval);
    console.log('Stop polling');
  }

  async sendTweet() {
    this.state.loading = true;
    await fetch(`${this.config.apiUrl.private}addTweet`, {
      method: 'POST',
      body: this.newTweetText,
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      },
    });
    this.newTweetText = '';
    this.fetchFeed();
  }

  async fetchFeed() {
    const response = await fetch(`${this.config.apiUrl.private}getUserFeed`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      },
    });
    this.state.feed = await response.json();
    this.state.loading = false;
  }
}