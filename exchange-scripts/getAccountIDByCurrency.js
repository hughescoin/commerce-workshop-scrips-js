const crypto = require("crypto");
require("dotenv").config();
const CB_ACCESS_TIMESTAMP = Date.now() / 1000; // in ms
const CB_ACCESS_PASSPHRASE = process.env.CB_ACCESS_PASSPHRASE;
const CB_ACCESS_KEY = process.env.CB_ACCESS_KEY;
const secret = process.env.CB_SECRET;
const baseURL = process.env.BASE_URL;
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let requestPath = "/accounts";
let method = "GET";
let url = baseURL + requestPath;
let message = CB_ACCESS_TIMESTAMP + method + requestPath;
let key = Buffer.from(secret, "base64");
let hmac = crypto.createHmac("sha256", key);
const CB_ACCESS_SIGN = hmac.update(message).digest("base64");

function findAccountIDByName(str, arr) {
  let currency = str.toUpperCase();
  arr.forEach((account) => {
    if (account.currency == currency) {
      rl.close();
      return console.log(account.id);
    }
  });
}

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
async function promptUser() {
  rl.question("What asset ID would you like? ", async function (asset) {
    findAccountIDByName(asset, await getAccounts());
    rl.close();
  });
}

promptUser();
