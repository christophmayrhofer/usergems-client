export class Home {
  newTweetText = '';
  tweets = [];
  searchUser = '';
  lastSearchUser = '';
  loading = false;

  async sendTweet() {
    this.loading = true;
    await fetch('http://localhost:3000/addTweet', {
      method: 'POST',
      body: this.newTweetText,
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      },
    });
    this.newTweetText = '';
    this.fetchUserTweets();
  }

  async fetchUserTweets() {
    this.loading = true;
    const response = await fetch('http://localhost:3000/getUserTweets?username=' + this.searchUser, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      },
    });
    this.tweets = await response.json();
    this.lastSearchUser = this.searchUser;
    this.loading = false;
  }
}