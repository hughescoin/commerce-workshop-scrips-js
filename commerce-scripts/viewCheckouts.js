//view all checkouts

require("dotenv").config();
const axios = require("axios");
const baseURL = process.env.BASE_URL;
const url = baseURL + `/checkouts/`;

let config = {
  method: "GET",
  url: url,
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CC-API-KEY": process.env.API_KEY,
    "X-CC-Version": process.env.API_VERSION,
  },
};

async function viewCheckouts() {
  try {
    const response = await axios(url, config);
    console.log(response.data);
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}

viewCheckouts();
