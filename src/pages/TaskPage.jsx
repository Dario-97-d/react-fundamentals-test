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
      .catch(() => setMessage('Could not load task.'))
    
  }, [taskId])

  // Toggle task.done.
  const toggleDone = () => {
    axios
      .patch(`${API_URL}/tasks/${taskId}`, { done: !task.done })
      .then(response => setTask(response.data))
      .catch(() => setMessage(`Could not mark task as: ${task.done ? '"to be done"' : '"done"'}.`))
  }

  // Delete and Navigate.
  const handleDelete = () => {
    if (window.confirm('Delete task?')) {
      axios
        .delete(`${API_URL}/tasks/${taskId}`)
        .then(() => navigate('/tasks'))
        .catch(() => setMessage('Could not delete task.'))
    }
  }  

  return (<>
  
    <h1>{task.title}</h1>

    {message.length > 0 && <p>{message}</p>}

    <div className={`main-container ${styles.task}`}>
      
      {task.title.length > 0 &&
        <>
          <span className={`${styles.priority} ${priorityClasses[task.priority]}`}>
            Priority: {task.priority}
          </span>

          <p className={styles.description}>{task.description}</p>

          {task.done ?
            <p className={styles.doneTrue}>✅ Done</p>
            :
            <p className={styles.doneFalse}>⭕ To be done</p>
          }

          <div className={styles.toggleDoneContainer}>
            <span>Mark as:</span>
            
            <button
              className={task.done ? styles.setNotDone : styles.setDone}
              onClick={toggleDone}
              aria-pressed={task.done}
            >
              {task.done ? '⭕ To be done' : '✅ Done'}
            </button>
          </div>
          
          <div className={styles.actions}>
            <button className="delete" onClick={handleDelete}>Delete</button>

            <NavLink to={`/tasks/${task.id}/edit`}>Edit task</NavLink>
          </div>
        </>
      }

    </div>
    
  </>)
}
