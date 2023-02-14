const crypto = require('crypto');
const CB_ACCESS_TIMESTAMP = Date.now() / 1000; // in ms
const CB_ACCESS_PASSPHRASE = process.env.CB_ACCESS_PASSPHRASE;
const CB_ACCESS_KEY = process.env.CB_ACCESS_KEY;
const secret = process.env.CB_SECRET; //Exchange API Secret
const profileID = process.env.EXCHANGE_PROFILE_ID; //Exchange Profile ID
const paymentMethod = process.env.PAYMENT_ID; //This is the ID associated w/ your business banking account
const baseURL = process.env.BASE_URL;

const requestPath = `/withdrawals/payment-method/`;
const transferAmount = '3.5'; //Amount to be transfered to your bank account
const method = 'POST';

const url = baseURL + requestPath;
const data = JSON.stringify({
  profile_id: profileID,
  amount: transferAmount,
  payment_method_id: paymentMethod,
  currency: 'USD',
});

const message = CB_ACCESS_TIMESTAMP + method + requestPath + data;
const key = Buffer.from(secret, 'base64');
const hmac = crypto.createHmac('sha256', key);
const CB_ACCESS_SIGN = hmac.update(message).digest('base64');

async function withdrawToBankAccount() {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'CB-ACCESS-KEY': CB_ACCESS_KEY,
        'CB-ACCESS-PASSPHRASE': CB_ACCESS_PASSPHRASE,
        'CB-ACCESS-SIGN': CB_ACCESS_SIGN,
        'CB-ACCESS-TIMESTAMP': CB_ACCESS_TIMESTAMP,
      },
      body: data,
    });
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
withdrawToBankAccount();
