import { useState } from 'react';
import { api, emptyTask } from '../constants';
import TaskInput from '../components/TaskInput';

export default function CreateTaskPage()
{
  const [message, setMessage] = useState('')
  const [preventLoadingAnimation, setPreventLoadingAnimation] = useState(false)

  // Submit new Task.
  const onSubmit = (task) => {
    setPreventLoadingAnimation(false)
    setMessage('Creating task')

    return api
      .createTask(task)
      .then((response) => {
        setPreventLoadingAnimation(true)
        setMessage('The task has been created!')

        return response.data._id
      })
      .catch(() => {
        setPreventLoadingAnimation(true)
        setMessage('Could not create task.')
      })
  }

  return (<>

    <h1>New Task</h1>

    {message && <span id="loading-message" className={preventLoadingAnimation ? 'prevent-loading-animation' : '' }>{message}</span>}
    
    <TaskInput mode="create" initialValues={emptyTask()} onSubmit={onSubmit} />
    
  </>)
}
