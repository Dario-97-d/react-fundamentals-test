import { restdbFetch } from "./utils/restdb"

const allowedPriorities = ['low', 'medium', 'high']

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405 }
  }

  const body = JSON.parse(event.body)

  const { title, description = '', priority, done = false } = body

  if (!title || !priority) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'A title and a priority are required.' })
    }
  }

  if (!allowedPriorities.includes(priority)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid priority.' })
    }
  }

  if (typeof done !== 'boolean') {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `The parameter done must be a boolean, ${typeof done} given.` })
    }
  }

  try {
    const response = await restdbFetch('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description, priority, done })
    });

    const data = await response.json()

    return {
      statusCode: 201,
      body: JSON.stringify(data)
    }
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create task.' })
    }
  }
}
