//creating a charge

require("dotenv").config();
const axios = require("axios");
const baseURL = process.env.BASE_URL;
const url = baseURL + "/invoices/";

//Edit these fields
let customerName = "";
let businessName = "";
let pricingType = "fixed_price"; //or no_price (donation)
let customerEmail = "";

const invoiceDetails = JSON.stringify({
  business_name: businessName,
  customer_email: customerEmail,
  customer_name: customerName,
  pricing_type: pricingType, //no_price
  local_price: {
    amount: 3,
    currency: "USD",
  },
});

let config = {
  method: "POST",
  url: url,
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CC-API-KEY": process.env.API_KEY,
    "X-CC-Version": process.env.API_VERSION,
  },
  data: invoiceDetails,
};

async function createInvoice() {
  try {
    const response = await axios(url, config);
    console.log(response);
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}

createInvoice();
