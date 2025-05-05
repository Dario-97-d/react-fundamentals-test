import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { API_URL, priorityClasses } from '../constants'
import axios from 'axios'
import styles from './TasksPage.module.css'

export default function TasksPage()
{
  const [message, setMessage] = useState('')
  const [tasks, setTasks] = useState([])

  // Load Tasks.
  useEffect(() => {
    setMessage('')
    axios
      .get(`${API_URL}/tasks`)
      .then(response => setTasks(response.data))
      .catch(() => setMessage('Não foi possível carregar as tarefas.'))
  }, [])

  return (<>
  
    <h1>Todas as Tarefas</h1>

    <div className="main-container">
      {message && <p>{message}</p>}

      {tasks.length > 0 &&
        <div className={styles.grid}>
          <div className={styles.gridRowHeader}>
              <div>Título</div>
              <div>Prioridade</div>
              <div>Feita</div>
          </div>

          {tasks.map(t => (
            <NavLink key={t.id} to={`/tasks/${t.id}`} className={styles.gridRow}>
              
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
