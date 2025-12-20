import React, { createContext, useContext, useReducer, useEffect } from 'react'

// Initial state structure
const initialState = {
  projects: [
    {
      id: 'p1',
      name: 'Frontend',
      tasks: [
        { id: 't1', title: 'Setup React project', description: 'Initialize project structure' },
        { id: 't2', title: 'Create components', description: 'Build reusable components' },
      ],
    },
    {
      id: 'p2',
      name: 'Backend',
      tasks: [
        { id: 't3', title: 'Design API', description: 'Plan API endpoints' },
      ],
    },
    {
      id: 'p3',
      name: 'Testing',
      tasks: [],
    },
  ],
}

// Action types
export const ActionTypes = {
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
  MOVE_TASK: 'MOVE_TASK',
  LOAD_STATE: 'LOAD_STATE',
}

// Reducer function
const projectReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TASK: {
      const { projectId, task } = action.payload
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === projectId
            ? { ...project, tasks: [...project.tasks, task] }
            : project
        ),
      }
    }

    case ActionTypes.DELETE_TASK: {
      const { projectId, taskId } = action.payload
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                tasks: project.tasks.filter((task) => task.id !== taskId),
              }
            : project
        ),
      }
    }

    case ActionTypes.MOVE_TASK: {
      const { taskId, fromProjectId, toProjectId } = action.payload
      const fromProject = state.projects.find((p) => p.id === fromProjectId)
      const task = fromProject?.tasks.find((t) => t.id === taskId)

      if (!task) return state

      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === fromProjectId) {
            return {
              ...project,
              tasks: project.tasks.filter((t) => t.id !== taskId),
            }
          }
          if (project.id === toProjectId) {
            return {
              ...project,
              tasks: [...project.tasks, task],
            }
          }
          return project
        }),
      }
    }

    case ActionTypes.LOAD_STATE: {
      return action.payload
    }

    default:
      return state
  }
}

// LocalStorage utilities
const STORAGE_KEY = 'projectBoardState'

export const loadStateFromStorage = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)
    if (serializedState === null) {
      return initialState
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error('Error loading state from localStorage:', err)
    return initialState
  }
}

export const saveStateToStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serializedState)
  } catch (err) {
    console.error('Error saving state to localStorage:', err)
  }
}

// Create Context
const ProjectContext = createContext()

// Context Provider Component
export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState)

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = loadStateFromStorage()
    if (savedState && savedState.projects) {
      dispatch({ type: ActionTypes.LOAD_STATE, payload: savedState })
    }
  }, [])

  // Save state to localStorage whenever state changes
  useEffect(() => {
    saveStateToStorage(state)
  }, [state])

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  )
}

// Custom hook to use the context
export const useProjectContext = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider')
  }
  return context
}


