import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/api';
import { emptyTask } from '../utils/utils'
import TaskInput from '../components/TaskInput'

export default function EditTaskPage()
{
  const { taskId } = useParams()

  const [message, setMessage] = useState('Loading task')
  const [preventLoadingAnimation, setPreventLoadingAnimation] = useState(false)
  const [task, setTask] = useState(emptyTask())
  
  // Load Task to edit.
  useEffect(() => {
    api
      .getTask(taskId)
      .then(response => {
        setMessage('')
        setTask(response.data)
      })
      .catch(() => {
        setPreventLoadingAnimation(true)
        setMessage('Could not load task.')
      })
  }, [taskId])

  // Submit edited Task.
  const onSubmit = (task) => {
    setPreventLoadingAnimation(false)
    setMessage('Updating task')

    return api
      .editTask(taskId, task)
      .then((response) => {
        setPreventLoadingAnimation(true)
        setMessage('The task has been updated!')

        return response.data._id
      })
      .catch(() => {
        setPreventLoadingAnimation(true)
        setMessage('Could not update task.')
      })
  }

  return (<>

    <h1>Edit Task</h1>

    {message && <p id="loading-message" className={ preventLoadingAnimation ? 'prevent-loading-animation' : '' }>{message}</p>}
    
    <TaskInput mode="edit" initialValues={task} onSubmit={onSubmit} />
    
  </>)
}
