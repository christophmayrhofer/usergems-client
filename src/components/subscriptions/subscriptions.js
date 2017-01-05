export class Subscriptions {
  newSubscriptionText = '';
  subscriptions = [];
  loading = false;

  constructor() {
    this.fetchUserSubscriptions();
  }

  async addSubscription() {
    await fetch('http://localhost:3000/addSubscription', {
      method: 'POST',
      body: this.newSubscriptionText,
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      },
    });
    this.fetchUserSubscriptions();
  }

  async fetchUserSubscriptions() {
    this.loading = true;
    const response = await fetch('http://localhost:3000/getUserSubscriptions', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      },
    });
    this.subscriptions = await response.json();
    console.log(this.subscriptions);
    this.loading = false;
  }

  async deleteSubscription(id) {
    this.loading = true;
    console.log(id);
    await fetch('http://localhost:3000/deleteSubscription?id=' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      },
    });
    this.fetchUserSubscriptions();
    this.loading = false;
  }
}
