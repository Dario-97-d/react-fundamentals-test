import { restdbFetch } from "./restdb"

export async function deleteIfExpired(existingTasks) {
  // -- Return if there aren't tasks. --
  if (existingTasks.length === 0) return []
  
  const userChangedDates = existingTasks
    .map(t => t.lastUserChange)
    .filter(luc => luc !== "0")
  
  // -- Return if all tasks are original. --
  if (userChangedDates.length === 0) return existingTasks
  
  // -- Reset data if older than last 4AM UTC. --
  
  const mostRecentUserChangeDate = userChangedDates
    .reduce((max, current) => current > max ? current : max)
  
  const now = new Date()
  const lastFourAm = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - (now.getUTCHours() < 4 ? 1 : 0),
    4
  )).toISOString()
  
  // -- Return if most recently changed data was set after last 4AM UTC. --
  if (lastFourAm < mostRecentUserChangeDate) return existingTasks
  
  // Delete current data in the database if older than last 4AM UTC.
  const allIds = existingTasks.map(t => t._id)
  await restdbFetch("/tasks/*", {
    method: "DELETE",
    body: JSON.stringify(allIds)
  })
  
  return []
}