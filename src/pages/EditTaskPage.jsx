import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_URL, emptyTask } from '../constants'
import axios from 'axios'
import TaskInput from '../components/TaskInput'

export default function EditTaskPage()
{
  const { taskId } = useParams()

  const [message, setMessage] = useState('')
  const [task, setTask] = useState(emptyTask())
  
  // Load Task to edit.
  useEffect(() => {
    axios
      .get(`${API_URL}/tasks/${taskId}`)
      .then(response => setTask(response.data))
      .catch(() => setMessage('Could not load task.'))
  }, [taskId])

  // Submit edited Task.
  const onSubmit = (task) => {
    return axios
      .put(`${API_URL}/tasks/${taskId}`, task)
      .then((response) => {
        setMessage('The task has been updated!')
        return response.data.id
      })
      .catch(() => setMessage('Could not update task.'))
  }

  return (<>

    <h1>Edit Task</h1>

    {message.length > 0 && <span>{message}</span>}
    
    <TaskInput mode="edit" initialValues={task} onSubmit={onSubmit} />
    
  </>)
}
