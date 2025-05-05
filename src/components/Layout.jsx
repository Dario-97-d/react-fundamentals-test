import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css';

import NavBar from './NavBar';

export default function Layout()
{
  return (
    <div className="layout-container">
      <header>
        <NavBar />
      </header>
      
      <main>
        <Outlet />
      </main>

      <footer>
        <NavLink to={-1}>Back</NavLink>
      </footer>
    </div>
  )
}
