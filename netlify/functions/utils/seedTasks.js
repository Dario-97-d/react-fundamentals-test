import { restdbFetch } from "./restdb"
import SEED_TASKS from "./tasksToSeed.js"

export async function ensureSeedData(existingTasks) {
  // Return existing tasks if any.
  if (existingTasks.length > 0) return existingTasks
  
  await restdbFetch("/tasks", {
    method: "POST",
    body: JSON.stringify(SEED_TASKS)
  })

  // Get tasks from the database. Returning just SEED_TASKS wouldn't retrieve the ids.
  const response = await restdbFetch("/tasks")
  return response.json()
}
