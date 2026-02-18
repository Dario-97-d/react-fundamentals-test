import { restdbFetch } from './utils/restdb'

export async function handler(event) {
    const { id } = event.queryStringParameters || {}

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'The task id is required.' })
    }
  }

  try {
    const response = await restdbFetch(`/tasks/${id}`);

    if (!response.ok) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Task not found.' })
      }
    }

    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not get task.' })
    }
  }
}
