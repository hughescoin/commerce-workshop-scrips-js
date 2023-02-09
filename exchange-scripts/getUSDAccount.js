require("dotenv").config();
const crypto = require("crypto");
const CB_ACCESS_TIMESTAMP = Date.now() / 1000; // in ms
const CB_ACCESS_PASSPHRASE = process.env.CB_ACCESS_PASSPHRASE;
const CB_ACCESS_KEY = process.env.CB_ACCESS_KEY;
const secret = process.env.CB_SECRET;
const baseURL = process.env.BASE_URL;

let requestPath = "/accounts";
let method = "GET";
let url = baseURL + requestPath;

let message = CB_ACCESS_TIMESTAMP + method + requestPath;
let key = Buffer.from(secret, "base64");
let hmac = crypto.createHmac("sha256", key);
const CB_ACCESS_SIGN = hmac.update(message).digest("base64");

async function getAccounts() {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "CB-ACCESS-KEY": CB_ACCESS_KEY,
        "CB-ACCESS-SIGN": CB_ACCESS_SIGN,
        "CB-ACCESS-TIMESTAMP": CB_ACCESS_TIMESTAMP,
        "CB-ACCESS-PASSPHRASE": CB_ACCESS_PASSPHRASE,
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
    element.currency === "USD" ? (id = element.id) : false;
  });
  console.log(id);
}

usdAccountID();
