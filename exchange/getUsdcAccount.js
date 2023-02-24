const crypto = require('crypto');
const timestamp = Date.now() / 1000; // in ms
const passphrase = process.env.CB_ACCESS_PASSPHRASE;
const accessKey = process.env.CB_ACCESS_KEY;
const secret = process.env.CB_SECRET;
const baseURL = process.env.BASE_URL;

const requestPath = '/accounts';
const method = 'GET';
const url = baseURL + requestPath;
const message = timestamp + method + requestPath;
const key = Buffer.from(secret, 'base64');
const hmac = crypto.createHmac('sha256', key);
const signature = hmac.update(message).digest('base64');

function findAccountIDByName(str, arr) {
  let currency = str.toUpperCase();
  arr.forEach((account) => {
    if (account.currency == currency) {
      console.log(account.id);
    }
  });
}

async function getUsdcAccount() {
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
    let accounts = new Array(...data);
    findAccountIDByName('usdc', accounts);
  } catch (error) {
    console.log(error);
  }
}
getUsdcAccount();
