const crypto = require("crypto");
require("dotenv").config();
const cb_access_timestamp = Date.now() / 1000; // in ms
const cb_access_passphrase = process.env.CB_ACCESS_PASSPHRASE;
const cb_access_key = process.env.CB_ACCESS_KEY;
const secret = process.env.CB_SECRET;
const baseURL = process.env.BASE_URL;

var requestPath = "/transfers/";
const method = "GET";
let url = baseURL + requestPath;

let message = cb_access_timestamp + method + requestPath;
let key = Buffer.from(secret, "base64");
let hmac = crypto.createHmac("sha256", key);
let cb_access_sign = hmac.update(message).digest("base64");

async function getProfileTransfers() {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "CB-ACCESS-KEY": cb_access_key,
        "CB-ACCESS-SIGN": cb_access_sign,
        "CB-ACCESS-TIMESTAMP": cb_access_timestamp,
        "CB-ACCESS-PASSPHRASE": cb_access_passphrase,
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getProfileTransfers();
