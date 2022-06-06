import { client } from '../../api/client'

const initialState = [
  { id: 0, text: 'Learn React', completed: true },
  { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
  { id: 2, text: 'Create one project', completed: false, color: 'blue' },
]

const nextTodoId = (todos) => {
  const maxId = todos.reduce(
    (prevItem, curItem) => Math.max(prevItem, curItem.id),
    -1
  )
  return Number(maxId) + 1
}

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TODOS/TODO_ADDED':
      return [...state, action.payload]
    case 'TODOS/TODO_TOGGLED':
      return state.map((todo) => {
        if (todo.id !== action.payload) return todo
        return { ...todo, completed: !todo.completed }
      })

    case 'TODOS/TODO_COLOR_CHANGED':
      return state.map((todo) => {
        if (todo.id !== action.payload.id) return todo
        return {
          ...todo,
          color: action.payload.color,
        }
      })
    case 'todos/todoLoaded': {
      return action.payload
    }
    case 'todos/allCompleted': {
      return state.map((todo) => {
        if (todo.completed) return todo
        return { ...todo, completed: true }
      })
    }

    case 'todos/clearedCompleted': {
      const todos = state.filter((todo) => !todo.completed)
      console.log(todos, 'todos/clearedComplted')
      return todos
    }

    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      return state.map((todo) => {
        if (todo.id !== todoId) return todo
        return {
          ...todo,
          color: color,
        }
      })
    }
    default:
      return state
  }
}

//Action Creator
const todoLoaded = (todos) => {
  return {
    type: 'todos/todoLoaded',
    payload: todos,
  }
}

const todoAdded = (todo) => {
  return {
    type: 'TODOS/TODO_ADDED',
    payload: todo,
  }
}

export const allTodosCompleted = () => ({ type: 'todos/allCompleted' })
export const clearCompletedTodos = () => ({ type: 'todos/clearedCompleted' })
export const fetchTodos = async (dispatch, getState) => {
  const response = await client.get('/fakeApi/todos')
  const stateBefore = getState()
  console.log('Todos before dispatch: ', stateBefore.todos.length)
  dispatch(todoLoaded(response.todos))
  // dispatch({ type: 'todos/todoLoaded', payload: response.todos })
  const stateAfter = getState()
  console.log('Todos After dispatch: ', stateAfter, stateAfter.todos.length)
}

export const saveNewTodo = (text) => async (dispatch, getState) => {
  const initialTodo = { text }
  const response = await client.post('/fakeApi/todos', { todo: initialTodo })
  console.log(response, 'SAVE TODO')
  dispatch(todoAdded(response.todo))
  console.log(getState())
}
export default todosReducer
