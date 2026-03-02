import { restdbFetch } from "./utils/restdb";
import { validateTask } from "./utils/validator";

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

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON body." })
    }
  }

  const { valid, errors, data } = validateTask(body)
  if (!valid) {
    return {
      statusCode: 400,
      body: JSON.stringify({ errors })
    }
  }

  try {
    const response = await restdbFetch(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })

    const result = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not update task.' })
    }
  }
}
