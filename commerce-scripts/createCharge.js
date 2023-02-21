const baseURL = process.env.BASE_URL;
const url = `${baseURL}/charges`;

const chargeDetails = JSON.stringify({
  name: 'New charge',
  description: 'Test Charge',
  pricing_type: 'fixed_price', //Use "no_price" for donation checkouts and recurring deposits
  local_price: {
    amount: 2,
    currency: 'USD',
  },
  metadata: {
    customer_id: 7979,
    customer_name: 'Bobby Brown',
  },
});

async function createCharge() {
  try {
    const response = await fetch(url, {
      method: 'POST',
      url: url,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CC-API-KEY': process.env.API_KEY,
        'X-CC-Version': process.env.API_VERSION,
      },
      body: chargeDetails,
    });
    const data = await response.json();
    //To view the full charge object console.log(data.data)
    console.log(data.data.code);
  } catch (error) {
    console.log(error);
  }
}

createCharge();
