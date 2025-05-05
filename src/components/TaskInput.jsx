import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './TaskInput.module.css'

const bgPriorityClasses = {
  baixa: styles.bgPriorityLow,
  media: styles.bgPriorityMedium,
  alta: styles.bgPriorityHigh,
}

export default function TaskInput({ mode, initialValues, onSubmit })
{
  const [task, setTask] = useState(initialValues)
  const [submittedTaskId, setSubmittedTaskId] = useState('')

  // Set initial values.
  useEffect(() => {
    setTask(initialValues)
  }, [initialValues])

  // Update values.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setTask(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  // Submit onto parent component.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedTaskId(await onSubmit(task))
  }

  return (<>

    <div className="main-container">
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Título</label>
          
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Descrição</label>
          
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className={styles.textarea}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="priority" className={`${styles.label}`}>Prioridade</label>
          
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className={`${styles.select} ${bgPriorityClasses[task.priority]}`}
          >
            <option value="">Selecione a prioridade</option>
            <option value="baixa" className={task.priority || "priorityLow"}>Baixa</option>
            <option value="media" className={task.priority || "priorityMedium"}>Média</option>
            <option value="alta" className={task.priority || "priorityHigh"}>Alta</option>
          </select>
        </div>
        
        <div className={styles.checkboxGroup}>
          <label htmlFor="done" className={styles.checkboxLabel}>
            <input
              type="checkbox"
              id="done"
              name="done"
              checked={task.done}
              onChange={handleChange}
              className={styles.checkbox}
            />
            Feita
          </label>
        </div>

        <div className={styles.actions}>
          {submittedTaskId && <NavLink to={`/tasks/${submittedTaskId}`}>Ver tarefa {mode === 'create' ? 'criada' : 'editada'}</NavLink>}

          <button type="submit" className={`${mode} ${styles[mode]}`}>
            {mode === 'create' ? 'Criar' : 'Editar'}
          </button>
        </div>
      </form>
    </div>

  </>)
}