import React from 'react'
import { ProjectProvider } from './context/ProjectContext'
import { useProjectManager } from './hooks/useProjectManager'
import Column from './components/Column'
import './App.css'

/**
 * Main App Component - Container component that uses the custom hook
 * This component connects the business logic (useProjectManager) with
 * the presentational components (Column, Task)
 */
const AppContent = () => {
  const { projects, addTask, deleteTask, moveTask } = useProjectManager()

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Project Board</h1>
        <p className="app-subtitle">Task Management System</p>
      </header>

      <main className="app-main">
        <div className="board">
          {projects.map((project) => (
            <Column
              key={project.id}
              project={project}
              onAddTask={addTask}
              onDeleteTask={deleteTask}
              onMoveTask={moveTask}
            />
          ))}
        </div>
      </main>

      <footer className="app-footer">
        <p>
          Built with React Context API, useReducer, and Custom Hooks
        </p>
      </footer>
    </div>
  )
}

/**
 * App Component - Wraps the app content with the Context Provider
 */
const App = () => {
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  )
}

export default App


