import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { API_URL, emptyTask, priorityClasses } from '../constants'
import axios from 'axios'
import styles from './TaskPage.module.css'

export default function TaskPage()
{
  const { taskId } = useParams()

  const [message, setMessage] = useState('')
  const [task, setTask] = useState(emptyTask())

  const navigate = useNavigate()

  // Load Task.
  useEffect(() => {
    axios
      .get(`${API_URL}/tasks/${taskId}`)
      .then(response => setTask(response.data))
      .catch(() => setMessage('Não foi possível carregar a tarefa.'))
    
  }, [taskId])

  // Toggle task.done.
  const toggleDone = () => {
    axios
      .patch(`${API_URL}/tasks/${taskId}`, { done: !task.done })
      .then(response => setTask(response.data))
      .catch(() => setMessage(`Não foi possível marcar a tarefa como: ${task.done ? 'por fazer' : 'feita'}.`))
  }

  // Delete and Navigate.
  const handleDelete = () => {
    if (window.confirm('Apagar tarefa?')) {
      axios
        .delete(`${API_URL}/tasks/${taskId}`)
        .then(() => navigate('/tasks'))
        .catch(() => setMessage('Não foi possível apagar a tarefa.'))
    }
  }  

  return (<>
  
    <h1>{task.title}</h1>

    {message.length > 0 && <p>{message}</p>}

    <div className={`main-container ${styles.task}`}>
      
      {task.title.length > 0 &&
        <>
          <span className={`${styles.priority} ${priorityClasses[task.priority]}`}>
            Prioridade: {task.priority}
          </span>

          <p className={styles.description}>{task.description}</p>

          {task.done ?
            <p className={styles.doneTrue}>✅ Feita</p>
            :
            <p className={styles.doneFalse}>⭕ Por fazer</p>
          }

          <div className={styles.toggleDoneContainer}>
            <span>Marcar como:</span>
            
            <button
              className={task.done ? styles.setNotDone : styles.setDone}
              onClick={toggleDone}
              aria-pressed={task.done}
            >
              {task.done ? '⭕ Por fazer' : '✅ Feita'}
            </button>
          </div>
          
          <div className={styles.actions}>
            <button className="delete" onClick={handleDelete}>Apagar</button>

            <NavLink to={`/tasks/${task.id}/edit`}>Editar tarefa</NavLink>
          </div>
        </>
      }

    </div>
    
  </>)
}
