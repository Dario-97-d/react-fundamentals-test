import { NavLink } from "react-router-dom"
import styles from "./NavBar.module.css"

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/tasks"
        className={({ isActive }) =>
          isActive ? styles.active : styles.link
        }
      >
        All Tasks
      </NavLink>

      <NavLink
        to="/tasks/new"
        className={({ isActive }) =>
          isActive ? styles.active : styles.link
        }
      >
        New Task
      </NavLink>
    </nav>
  )
}