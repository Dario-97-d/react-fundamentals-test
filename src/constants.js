export const API_URL = 'http://localhost:3001';

export const emptyTask = () => {
  return {
    title: '',
    description: '',
    priority: '',
    done: false
  }
}

export const priorityClasses = {
  baixa: 'priorityLow',
  media: 'priorityMedium',
  alta: 'priorityHigh',
}
