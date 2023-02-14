const chargeCode = process.env.CHARGE_CODE;
const baseURL = process.env.BASE_URL;
const url = baseURL + `/charges/${chargeCode}/cancel/`;

async function cancelCharge() {
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
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

cancelCharge();
