import React, { useState } from 'react'
import Task from './Task'
import './Column.css'

/**
 * Column Component - Presentational component for displaying a project column
 * This is a "dumb" component that receives props and calls callbacks
 */
const Column = ({ project, onAddTask, onDeleteTask, onMoveTask }) => {
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')

  const handleAddTask = (e) => {
    e.preventDefault()
    if (newTaskTitle.trim()) {
      try {
        onAddTask(project.id, newTaskTitle, newTaskDescription)
        setNewTaskTitle('')
        setNewTaskDescription('')
        setIsAddingTask(false)
      } catch (error) {
        alert(error.message)
      }
    }
  }

  const handleCancelAdd = () => {
    setNewTaskTitle('')
    setNewTaskDescription('')
    setIsAddingTask(false)
  }

  return (
    <div className="column">
      <div className="column-header">
        <h2 className="column-title">{project.name}</h2>
        <span className="column-count">{project.tasks.length}</span>
      </div>

      <div className="column-tasks">
        {project.tasks.length === 0 ? (
          <div className="empty-state">No tasks yet</div>
        ) : (
          project.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              projectId={project.id}
              onDelete={onDeleteTask}
              onMove={onMoveTask}
            />
          ))
        )}
      </div>

      {isAddingTask ? (
        <form className="add-task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            className="task-input"
            placeholder="Task title *"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            autoFocus
            required
          />
          <textarea
            className="task-textarea"
            placeholder="Task description (optional)"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            rows="3"
          />
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancelAdd}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          className="add-task-btn"
          onClick={() => setIsAddingTask(true)}
        >
          + Add Task
        </button>
      )}
    </div>
  )
}

export default Column


