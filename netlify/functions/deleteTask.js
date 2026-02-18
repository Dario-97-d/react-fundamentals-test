import { restdbFetch } from "./utils/restdb";

export async function handler(event) {
  if (event.httpMethod !== 'DELETE') {
    return { statusCode: 405 }
  }

  const { id } = event.queryStringParameters || {}

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'The task id is required.' })
    }
  }

  try {
   await restdbFetch(`/tasks/${id}`, {
      method: 'DELETE'
    });

    return {
      statusCode: 204,
      body: ''
    }
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not delete task.' })
    }
  }
}
