import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './TaskInput.module.css'

const bgPriorityClasses = {
  low: styles.bgPriorityLow,
  medium: styles.bgPriorityMedium,
  high: styles.bgPriorityHigh,
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
          <label htmlFor="title" className={styles.label}>Title</label>
          
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
          <label htmlFor="description" className={styles.label}>Description</label>
          
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className={styles.textarea}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="priority" className={`${styles.label}`}>Priority</label>
          
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className={`${styles.select} ${bgPriorityClasses[task.priority]}`}
          >
            <option value="">Select priority</option>
            <option value="low" className={task.priority || "priorityLow"}>Low</option>
            <option value="medium" className={task.priority || "priorityMedium"}>Medium</option>
            <option value="high" className={task.priority || "priorityHigh"}>High</option>
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
            Done
          </label>
        </div>

        <div className={styles.actions}>
          {submittedTaskId && <NavLink to={`/tasks/${submittedTaskId}`}>View {mode === 'create' ? 'created' : 'edited'} task</NavLink>}

          <button type="submit" className={`${mode} ${styles[mode]}`}>
            {mode === 'create' ? 'Add' : 'Update'}
          </button>
        </div>
      </form>
    </div>

  </>)
}