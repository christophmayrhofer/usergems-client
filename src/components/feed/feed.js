export class Feed {
  tweets = [];
  pollInterval = 5000;
  loading = false;

  attached() {
    this.loading = true;
    this.fetchFeed()
    this.fetchInterval = setInterval(() => this.fetchFeed(), this.pollInterval);
    console.log('Start polling: ' + this.pollInterval);
  }

  detached() {
    clearInterval(this.fetchInterval);
    console.log('Stop polling: ' + this.pollInterval);
  }

  async fetchFeed() {
    const response = await fetch('http://localhost:3000/getUserFeed', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      },
    });
    this.tweets = await response.json();
    this.loading = false;
  }
}