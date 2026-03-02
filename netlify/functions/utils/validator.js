const MAX_TITLE = 31
const MAX_DESCRIPTION = 255
const ALLOWED_PRIORITIES = ["low", "medium", "high"]

function normalizeString(value) {
  if (typeof value !== "string") return null
  return value.trim()
}

export function validateTask(input) {
  const errors = []
  const data = {}

  // Validate title.
  const title = normalizeString(input.title)
  if (!title) {
    errors.push("Title is required.")
  } else if (title.length > MAX_TITLE) {
    errors.push("Title exceeds maximum length.")
  } else {
    data.title = title
  }

  // Validate description.
  const description = normalizeString(input.description) || ""
  if (description.length > MAX_DESCRIPTION) {
    errors.push("Description exceeds maximum length.")
  } else {
    data.description = description
  }

  // Validate priority.
  if (!ALLOWED_PRIORITIES.includes(input.priority)) {
    errors.push("Invalid priority value.")
  } else {
    data.priority = input.priority
  }

  // Validate task.done.
  if (typeof input.done !== "boolean") {
    errors.push("Done must be boolean.")
  } else {
    data.done = input.done
  }

  return {
    valid: errors.length === 0,
    errors,
    data
  }
}
