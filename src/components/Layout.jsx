import { Outlet, useNavigate } from "react-router-dom"
import "./Layout.css"
import NavBar from "./NavBar"

export default function Layout() {
  const navigate = useNavigate()

  return (
    <div className="layout-container">
      <header className="layout-header">
        <NavBar />
      </header>

      <main className="layout-main">
        <div className="page">
          <Outlet />
        </div>
      </main>

      <footer className="layout-footer">
        <button onClick={() => navigate(-1)}>Back</button>
      </footer>
    </div>
  )
}