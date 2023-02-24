const baseURL = process.env.BASE_URL;
const url = `${baseURL}/events/`;

async function listEvents() {
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
    console.log(data.data);
  } catch (error) {
    console.log(error);
  }
}

listEvents();
