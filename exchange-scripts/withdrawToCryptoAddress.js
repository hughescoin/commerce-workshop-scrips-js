const crypto = require("crypto");
require("dotenv").config();
const CB_ACCESS_TIMESTAMP = Date.now() / 1000; // in ms
const CB_ACCESS_PASSPHRASE = process.env.CB_ACCESS_PASSPHRASE;
const CB_ACCESS_KEY = process.env.CB_ACCESS_KEY;
const secret = process.env.CB_SECRET;
const profileID = process.env.EXCHANGE_PROFILE_ID;
const baseURL = process.env.BASE_URL;
// const readline = require("readline");
// import { stdin as input, stdout as output } from "node:process";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

let userCurrency;
let userWithdrawlAddress;
let userWithdrawalAmount;

var requestPath = "/withdrawals/crypto/";
let method = "POST";
let url = baseURL + requestPath;
// let data = JSON.stringify({
//   profile_id: profileID,
//   amount: userWithdrawalAmount, //"3",
//   crypto_address: userWithdrawlAddress, //"0xB6d00D83158feE6695C72ff9c5E915478A479224",
//   currency: userCurrency, //"USDC",
// });

let message = CB_ACCESS_TIMESTAMP + method + requestPath + data;
let key = Buffer.from(secret, "base64");
let hmac = crypto.createHmac("sha256", key);
const CB_ACCESS_SIGN = hmac.update(message).digest("base64");

async function withdrawToCryptoAddress() {
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
      body: JSON.stringify({
        profile_id: profileID,
        amount: userWithdrawalAmount, //"3",
        crypto_address: userWithdrawlAddress, //"0xB6d00D83158feE6695C72ff9c5E915478A479224",
        currency: userCurrency, //"USDC",
      }),
    });
    const conf = await response.json();
    return console.log(conf);
  } catch (error) {
    console.log(error);
  }
}

const funky = async function () {
  console.log("started");
  rl.question("What currency would you like to withdraw: ", (userCurrency) => {
    userCurrency = userCurrency.toUpperCase();
    rl.question(
      `How many units of ${userCurrency} would you like withdrawn? `,
      (userWithdrawalAmount) => {
        rl.question(
          `Enter in the blockchain address to withdraw ${userWithdrawalAmount} ${userCurrency} to: `,
          (userWithdrawlAddress) => {
            rl.question(
              `Approve ${userWithdrawalAmount} ${userCurrency} to ${userWithdrawlAddress}? [y/N]`,
              (confirmation) => {
                console.log(confirmation);
                console.log(data);
                confirmation?.toLowerCase() === "y"
                  ? withdrawToCryptoAddress()
                  : rl.close();
                rl.close();
              }
            );
          }
        );
      }
    );
  });
};

funky();
