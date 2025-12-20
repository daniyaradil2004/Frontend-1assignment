import React, { useState } from 'react'
import './Task.css'

/**
 * Task Component - Presentational component for displaying individual tasks
 * This is a "dumb" component that receives props and calls callbacks
 */
const Task = ({ task, projectId, onDelete, onMove }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(projectId, task.id)
    }
  }

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="task" onClick={handleToggleExpand}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <button
          className="task-delete-btn"
          onClick={handleDelete}
          aria-label="Delete task"
        >
          ×
        </button>
      </div>
      {isExpanded && task.description && (
        <p className="task-description">{task.description}</p>
      )}
      {isExpanded && (
        <div className="task-actions">
          <span className="task-id">ID: {task.id}</span>
        </div>
      )}
    </div>
  )
}

export default Task


