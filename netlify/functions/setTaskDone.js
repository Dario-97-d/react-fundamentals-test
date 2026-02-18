import { restdbFetch } from './utils/restdb';

export async function handler(event) {
    if (event.httpMethod !== 'PATCH') {
    return { statusCode: 405 }
  }

  const { id } = event.queryStringParameters || {}

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'The task id is required.' })
    }
  }

  const body = JSON.parse(event.body)
  const { done } = body

  if (typeof done !== 'boolean') {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `The parameter done must be a boolean, ${typeof done} given.` })
    }
  }

  try {
    const response = await restdbFetch(`/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ done })
    });
    
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not set task.done.' })
    }
  }
}