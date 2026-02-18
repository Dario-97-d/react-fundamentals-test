import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, emptyTask } from '../constants'
import TaskInput from '../components/TaskInput'

export default function EditTaskPage()
{
  const { taskId } = useParams()

  const [message, setMessage] = useState('Loading task...')
  const [task, setTask] = useState(emptyTask())
  
  // Load Task to edit.
  useEffect(() => {
    api
      .getTask(taskId)
      .then(response => {
        setMessage('')
        setTask(response.data)
      })
      .catch(() => setMessage('Could not load task.'))
  }, [taskId])

  // Submit edited Task.
  const onSubmit = (task) => {
    setMessage('Updating task...')
    return api
      .editTask(taskId, task)
      .then((response) => {
        setMessage('The task has been updated!')
        return response.data._id
      })
      .catch(() => setMessage('Could not update task.'))
  }

  return (<>

    <h1>Edit Task</h1>

    {message && <span>{message}</span>}
    
    <TaskInput mode="edit" initialValues={task} onSubmit={onSubmit} />
    
  </>)
}
