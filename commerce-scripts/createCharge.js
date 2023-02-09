require("dotenv").config();
const baseURL = process.env.BASE_URL;
const url = baseURL + `/charges`;

const chargeDetails = JSON.stringify({
  name: "New charge",
  description: "Test Charge",
  pricing_type: "fixed_price", //no_price
  local_price: {
    amount: 2,
    currency: "USD",
  },
  metadata: {
    customer_id: 7979,
    customer_name: "Bobby Brown",
  },
});

async function createCharge() {
  try {
    const response = await fetch(url, {
      method: "POST",
      url: url,
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CC-API-KEY": process.env.API_KEY,
        "X-CC-Version": process.env.API_VERSION,
      },
      body: chargeDetails,
    });
    const data = await response.json();
    // return data.data  //returns the full charge object
    return console.log(data.data.code);
  } catch (error) {
    console.log(error);
  }
}

createCharge();
