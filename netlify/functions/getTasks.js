import { restdbFetch } from './utils/restdb.js';

export async function handler() {
  try {
    const response = await restdbFetch('/tasks');
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not get tasks.' })
    }
  }
}
