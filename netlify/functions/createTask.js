import { restdbFetch } from "./utils/restdb"
import { validateTask } from "./utils/validator"

const allowedPriorities = ['low', 'medium', 'high']

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405 }
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
    const response = await restdbFetch('/tasks', {
      method: "POST",
      body: JSON.stringify(data)
    })

    const result = await response.json()

    return {
      statusCode: 201,
      body: JSON.stringify(result)
    }
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not create task." })
    }
  }
}
