import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { api, priorityClasses } from '../constants'
import styles from './TasksPage.module.css'

export default function TasksPage()
{
  const [message, setMessage] = useState('Loading tasks')
  const [preventLoadingAnimation, setPreventLoadingAnimation] = useState(false)
  const [tasks, setTasks] = useState([])

  // Load Tasks.
  useEffect(() => {
    api
      .getTasks()
      .then(response => {
        setMessage('')
        setTasks(response.data)
      })
      .catch(() => {
        setPreventLoadingAnimation(true)
        setMessage('Could not load tasks.')
      })
  }, [])

  return (<>
  
    <h1>All Tasks</h1>

    {message && <p id="loading-message" className={ preventLoadingAnimation ? 'prevent-loading-animation' : '' }>{message}</p>}

    <div className="main-container">
      {tasks.length > 0 &&
        <div className={styles.grid}>
          <div className={styles.gridRowHeader}>
              <div>Title</div>
              <div>Priority</div>
              <div>Done</div>
          </div>

          {tasks.map(t => (
            <NavLink key={t._id} to={`/tasks/${t._id}`} className={styles.gridRow}>
              
              <div className={styles.title}>
                {t.title}
              </div>
              
              <div className={priorityClasses[t.priority]}>
                {t.priority}
              </div>

              <div>{t.done ? '✅' : '⭕'}</div>

            </NavLink>
              
          ))}
        </div>
      }
    </div>
  
  </>)
}
