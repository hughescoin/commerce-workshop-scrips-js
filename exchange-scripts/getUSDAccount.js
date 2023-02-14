const crypto = require('crypto');
const CB_ACCESS_TIMESTAMP = Date.now() / 1000;
const CB_ACCESS_PASSPHRASE = process.env.CB_ACCESS_PASSPHRASE;
const CB_ACCESS_KEY = process.env.CB_ACCESS_KEY;
const secret = process.env.CB_SECRET;
const baseURL = process.env.BASE_URL;

const requestPath = '/accounts';
const method = 'GET';
const url = baseURL + requestPath;
const message = CB_ACCESS_TIMESTAMP + method + requestPath;
const key = Buffer.from(secret, 'base64');
const hmac = crypto.createHmac('sha256', key);
const CB_ACCESS_SIGN = hmac.update(message).digest('base64');

async function getAccounts() {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'CB-ACCESS-KEY': CB_ACCESS_KEY,
        'CB-ACCESS-SIGN': CB_ACCESS_SIGN,
        'CB-ACCESS-TIMESTAMP': CB_ACCESS_TIMESTAMP,
        'CB-ACCESS-PASSPHRASE': CB_ACCESS_PASSPHRASE,
      },
    });
    const data = await response.json();
    let accounts = new Array(...data);
    return accounts;
  } catch (error) {
    console.log(error);
  }
}

async function usdAccountID() {
  const arr = await getAccounts();
  let id;
  arr.forEach((element) => {
    element.currency === 'USD' ? (id = element.id) : false;
  });
  console.log(id);
}

usdAccountID();
