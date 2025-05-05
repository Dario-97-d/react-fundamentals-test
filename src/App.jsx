import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import Layout from './components/Layout'
import CreateTaskPage from './pages/CreateTaskPage'
import EditTaskPage from './pages/EditTaskPage'
import TaskPage from './pages/TaskPage'
import TasksPage from './pages/TasksPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/tasks"} replace/>}></Route>
        
        <Route element={<Layout />}>
          <Route path="/tasks" element={<TasksPage />}></Route>
          <Route path="/tasks/new" element={<CreateTaskPage />}></Route>
          <Route path="/tasks/:taskId" element={<TaskPage />}></Route>
          <Route path="/tasks/:taskId/edit" element={<EditTaskPage />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
