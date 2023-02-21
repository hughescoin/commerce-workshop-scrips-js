require('dotenv').config();
const baseURL = process.env.BASE_URL;
const chargeCode = process.env.CHARGE_CODE;
const url = `${baseURL}/charges/${chargeCode}`;

async function viewTimeline() {
  try {
    const response = await fetch(url, {
      method: 'GET',
      url: url,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CC-API-KEY': process.env.API_KEY,
        'X-CC-Version': process.env.API_VERSION,
      },
    });
    const data = await response.json();
    return console.log(data.data.timeline);
  } catch (error) {
    console.log(error);
  }
}

viewTimeline();
