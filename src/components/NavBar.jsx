import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

export default function NavBar()
{
  return (
    <nav className={styles.nav}>
      <NavLink to="/tasks">Todas as Tarefas</NavLink>
      <NavLink to="/tasks/new">Nova Tarefa</NavLink>
    </nav>
  )
}