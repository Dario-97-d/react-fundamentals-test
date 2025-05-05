import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

export default function NavBar()
{
  return (
    <nav className={styles.nav}>
      <NavLink to="/tasks">All Tasks</NavLink>
      <NavLink to="/tasks/new">New Task</NavLink>
    </nav>
  )
}