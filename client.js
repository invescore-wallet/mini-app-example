const qs = require('qs');
const axios = require('axios');
const {CLIENT_ID, CLIENT_SECRET, POCKET_TOKEN_URL} = require('./settings.js');

class PocketClient {
  accessToken = null;
  refreshToken = null;
  expiresIn = 0;

  constructor() {
    this.getToken();
  }

  async getToken(grantType = 'client_credentials') {
    console.info('[PocketClient]: Logging in');
    const requestData = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: grantType,
    };
    if (grantType === 'refresh_token') {
      requestData.refresh_token = this.refreshToken;
    }
    try {
      const {data} = await axios.post(POCKET_TOKEN_URL, qs.stringify(requestData));

      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token;
      this.expiresIn = data.expires_in;

      if (data.expires_in > data.refresh_expires_in) {
        this.expiresIn = data.refresh_expires_in;
      }
    } catch (e) {
      return;
    }

    // Auto refresh token
    setTimeout(() => this.getToken('refresh_token'), this.expiresIn * 1000 - 10000);

    console.debug(`[PocketClient]: Token expires after ${this.expiresIn}s`);
    console.info('[PocketClient]: Successfully logged in');
  }
}

const pocketClient = new PocketClient();
module.exports = pocketClient;
