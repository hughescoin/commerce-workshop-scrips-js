const crypto = require('crypto');
const timestamp = Date.now() / 1000; // in ms
const passphrase = process.env.CB_ACCESS_PASSPHRASE;
const accessKey = process.env.CB_ACCESS_KEY;
const secret = process.env.CB_SECRET;
const baseURL = process.env.BASE_URL;

const requestPath = `/profiles/`;
const method = 'GET';
const url = baseURL + requestPath;

const message = timestamp + method + requestPath; // + data;
const key = Buffer.from(secret, 'base64');
const hmac = crypto.createHmac('sha256', key);
const signature = hmac.update(message).digest('base64');

async function getProfileID() {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'CB-ACCESS-KEY': accessKey,
        'CB-ACCESS-SIGN': signature,
        'CB-ACCESS-TIMESTAMP': timestamp,
        'CB-ACCESS-PASSPHRASE': passphrase,
      },
    });
    const data = await response.json();
    const profileID = data[0].id;
    console.log(profileID);
  } catch (error) {
    console.log(error);
  }
}

getProfileID();
