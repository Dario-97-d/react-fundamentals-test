import { restdbFetch } from "./utils/restdb";

const allowedPriorities = ['low', 'medium', 'high']

export async function handler(event) {
  if (event.httpMethod !== 'PUT') {
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
  const { title, description, priority, done } = body

  if (priority && !allowedPriorities.includes(priority)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid priority.' })
    }
  }

  if (done !== undefined && typeof done !== 'boolean') {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `The parameter done must be a boolean, ${typeof done} given.` })
    }
  }

  try {
    const response = await restdbFetch(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description, priority, done })
    });

    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not update task.' })
    }
  }
}
