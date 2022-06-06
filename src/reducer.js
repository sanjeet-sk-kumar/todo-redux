import { combineReducers } from 'redux'
import todosReducer from './features/todos/todoSlice'
import filtersReducer from './features/filters/filterSlice'

// const rootReducer = (state={}, action) =>{
//     return {
//         todos: todosReducer(state.todos, action),
//         filters: filtersReducer(state.filters, action)
//     }
// }

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
})

export default rootReducer
