import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { api, emptyTask, priorityClasses } from '../constants'
import styles from './TaskPage.module.css'

export default function TaskPage()
{
  const { taskId } = useParams()

  const [message, setMessage] = useState('Loading task')
  const [preventLoadingAnimation, setPreventLoadingAnimation] = useState(false)
  const [task, setTask] = useState(emptyTask())

  const navigate = useNavigate()

  // Load Task.
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

  // Toggle task.done.
  const toggleDone = () => {
    const taskDoneLabel = task.done ? '"to be done"' : '"done"';
    
    setPreventLoadingAnimation(false)
    setMessage(`Setting task as: ${taskDoneLabel}`)
    
    api
      .setTaskDone(taskId, !task.done)
      .then(response => {
        setMessage(`Task set as: ${taskDoneLabel}`)
        setPreventLoadingAnimation(true)
        setTask(response.data)
      })
      .catch(() => {
        setPreventLoadingAnimation(true)
        setMessage(`Could not mark task as: ${taskDoneLabel}.`)
      })
  }

  // Delete and Navigate.
  const handleDelete = () => {
    if (window.confirm('Delete task?')) {
      setPreventLoadingAnimation(false)
      setMessage('Deleting task')
      
      api
        .deleteTask(taskId)
        .then(() => navigate('/tasks'))
        .catch(() => {
          setPreventLoadingAnimation(true)
          setMessage('Could not delete task.')
        })
    }
  }  

  return (<>
  
    <h1>{task.title}</h1>

    {message && <p><span id="loading-message" className={preventLoadingAnimation ? 'prevent-loading-animation' : '' }>{message}</span></p>}

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

            <NavLink to={`/tasks/${task._id}/edit`}>Edit task</NavLink>
          </div>
        </>
      }

    </div>
    
  </>)
}
