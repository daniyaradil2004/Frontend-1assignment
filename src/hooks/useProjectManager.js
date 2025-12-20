import { useCallback } from 'react'
import { useProjectContext, ActionTypes } from '../context/ProjectContext'

/**
 * Custom Hook that encapsulates all business logic for task manipulation
 * This keeps presentational components "dumb" by handling all dispatch calls
 */
export const useProjectManager = () => {
  const { state, dispatch } = useProjectContext()

  // Generate unique ID for tasks
  const generateTaskId = useCallback(() => {
    return `t${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }, [])

  /**
   * Add a new task to a project
   * @param {string} projectId - The ID of the project to add the task to
   * @param {string} title - The title of the task
   * @param {string} description - The description of the task
   */
  const addTask = useCallback(
    (projectId, title, description = '') => {
      if (!title.trim()) {
        throw new Error('Task title cannot be empty')
      }

      const newTask = {
        id: generateTaskId(),
        title: title.trim(),
        description: description.trim(),
      }

      dispatch({
        type: ActionTypes.ADD_TASK,
        payload: {
          projectId,
          task: newTask,
        },
      })

      return newTask
    },
    [dispatch, generateTaskId]
  )

  /**
   * Delete a task from a project
   * @param {string} projectId - The ID of the project containing the task
   * @param {string} taskId - The ID of the task to delete
   */
  const deleteTask = useCallback(
    (projectId, taskId) => {
      dispatch({
        type: ActionTypes.DELETE_TASK,
        payload: {
          projectId,
          taskId,
        },
      })
    },
    [dispatch]
  )

  /**
   * Move a task from one project to another
   * @param {string} taskId - The ID of the task to move
   * @param {string} fromProjectId - The ID of the source project
   * @param {string} toProjectId - The ID of the destination project
   */
  const moveTask = useCallback(
    (taskId, fromProjectId, toProjectId) => {
      if (fromProjectId === toProjectId) {
        return // No need to move if it's the same project
      }

      dispatch({
        type: ActionTypes.MOVE_TASK,
        payload: {
          taskId,
          fromProjectId,
          toProjectId,
        },
      })
    },
    [dispatch]
  )

  /**
   * Get all projects
   * @returns {Array} Array of projects
   */
  const getProjects = useCallback(() => {
    return state.projects
  }, [state.projects])

  /**
   * Get a specific project by ID
   * @param {string} projectId - The ID of the project
   * @returns {Object|null} The project object or null if not found
   */
  const getProject = useCallback(
    (projectId) => {
      return state.projects.find((project) => project.id === projectId) || null
    },
    [state.projects]
  )

  return {
    projects: state.projects,
    addTask,
    deleteTask,
    moveTask,
    getProjects,
    getProject,
  }
}


