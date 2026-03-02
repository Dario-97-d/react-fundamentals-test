import { restdbFetch } from './utils/restdb'
import { deleteIfExpired } from './utils/dataReset'
import { ensureSeedData } from './utils/seedTasks'

export async function handler() {
  try {
    const response = await restdbFetch('/tasks')
    let data = await response.json()
    
    data = await deleteIfExpired(data)
    data = await ensureSeedData(data)

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
