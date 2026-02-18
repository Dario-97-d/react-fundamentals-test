import { useState } from 'react';
import { api, emptyTask } from '../constants';
import TaskInput from '../components/TaskInput';

export default function CreateTaskPage()
{
  const [message, setMessage] = useState('')

  // Submit new Task.
  const onSubmit = (task) => {
    setMessage('Creating task...')
    return api
      .createTask(task)
      .then((response) => {
        setMessage('The task has been created!')
        return response.data._id
      })
      .catch(() => setMessage('Could not create task.'))
  }

  return (<>

    <h1>New Task</h1>

    {message.length > 0 && <span>{message}</span>}
    
    <TaskInput mode="create" initialValues={emptyTask()} onSubmit={onSubmit} />
    
  </>)
}
