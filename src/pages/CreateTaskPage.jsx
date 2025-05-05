import { useState } from 'react';
import { API_URL, emptyTask } from '../constants';
import axios from 'axios';
import TaskInput from '../components/TaskInput';

export default function CreateTaskPage()
{
  const [message, setMessage] = useState('')

  // Submit new Task.
  const onSubmit = (task) => {
    return axios
      .post(`${API_URL}/tasks`, task)
      .then((response) => {
        setMessage('Tarefa criada!')
        return response.data.id
      })
      .catch(() => setMessage('Não foi possível registar a tarefa.'))
  }

  return (<>

    <h1>Nova Tarefa</h1>

    {message.length > 0 && <span>{message}</span>}
    
    <TaskInput mode="create" initialValues={emptyTask()} onSubmit={onSubmit} />
    
  </>)
}
