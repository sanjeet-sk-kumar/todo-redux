import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import './api/server'
import store from './store'
import { fetchTodos } from './features/todos/todoSlice'

console.log('Initial State: ', store.getState())
const unsubscribe = store.subscribe(() =>
  console.log('State after dispatch: ', store.getState())
)

store.dispatch({ type: 'TODOS/TODO_ADDED', payload: 'learn redux with react' })
store.dispatch({ type: 'FILTERS/STATUS_FILTER_CHANGED', payload: 'Active' })
// Stop listening to state updates
unsubscribe()
store.dispatch({ type: 'TODOS/TODO_ADDED', payload: 'Try creating a store' })
store.dispatch(fetchTodos)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
