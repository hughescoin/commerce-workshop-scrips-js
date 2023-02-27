/**
 * Copyright 2022 - 2023 Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
