// src/utils/Freecurrencyapi.js
class Freecurrencyapi {
  baseUrl = 'https://api.freecurrencyapi.com/v1/';

  constructor(apiKey = '') {
    this.headers = {
      apikey: apiKey
    };
  }

  call(endpoint, params = {}) {
    const paramString = new URLSearchParams(params).toString();
    return fetch(`${this.baseUrl}${endpoint}?${paramString}`, {
      headers: this.headers
    })
      .then(response => response.json())
      .then(data => data);
  }

  latest(params) {
    return this.call('latest', params);
  }
}

export default Freecurrencyapi;
