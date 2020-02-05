class Requests {
  constructor() {
    this.url = 'https://api.github.com';
    this.auth = 'token 8031989702a0a11352c58d38ee4d4bd4dff7de06';
  }

  getUsers(query) {
    return fetch(`${this.url}/users/${query}`, {
      headers: {
        Authorization: this.auth
      }
    })
      .then(res => res.json())
      .catch(res => console.error(err));
  }

  getRepos(query) {
    return fetch(`${this.url}/users/${query}/repos`, {
      headers: {
        Authorization: this.auth
      }
    })
      .then(res => res.json())
      .catch(res => console.error(err));
  }

  getStarred(query) {
    return fetch(`${this.url}/users/${query}/starred`, {
      headers: {
        Authorization: this.auth
      }
    })
      .then(res => res.json())
      .catch(res => console.error(err));
  }
}
