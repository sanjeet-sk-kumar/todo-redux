import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'

/*
    createStore can also accept a preloadedState value as its second argument. You could use this to add initial data when the store is created, such as values that were included in an HTML page sent from the server, or persisted in localStorage and read back when the user visits the page again,
*/
let preLoadedState
const persistedTodosString = localStorage.getItem('todos')
if (persistedTodosString) {
  preLoadedState = {
    todos: JSON.parse(persistedTodosString),
  }
}

/*
ENHANCERS:
createStore can also take one more argument, which is used to customize the store's abilities and give it new powers.

Redux stores are customized using something called a store enhancer. 
A store enhancer is like a special version of createStore that adds another layer wrapping around the original Redux store. An enhanced store can then change how the store behaves, by supplying its own versions of the store's dispatch, getState, and subscribe functions instead of the originals.

*/
const sayHiOnDispatch = (createStore) => {
  return (rootReducer, preLoadedState, enhancers) => {
    const store = createStore(rootReducer, preLoadedState, enhancers)
    const newDispatch = (action) => {
      const result = store.dispatch(action)
      console.log('Hi')
      return result
    }
    return { ...store, dispatch: newDispatch }
  }
}

const includeMeaningOfLie = (createStore) => {
  return (rootReducer, preLoadedState, enhancers) => {
    const store = createStore(rootReducer, preLoadedState, enhancers)
    const newGetState = () => {
      return { ...store.getState(), meaningOfLife: 60 }
    }
    return { ...store, getState: newGetState }
  }
}

/*
createStore only accepts one enhancer as its third argument! How can we pass two enhancers at the same time?
the Redux core includes a compose function that can be used to merge multiple enhancers together.
*/
const combinedEnhancers = compose(sayHiOnDispatch, includeMeaningOfLie)

/*
If you don't have any preloadedState to pass in, you can pass the enhancer as the second argument instead:
const store = createStore(rootReducer, storeEnhancer)
*/

// MIDDLEWARE

const loggerMiddleWare = (storeAPI) => (next) => (action) => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', storeAPI.getState())
  return result
}

const delayedMiddleware = (storeAPI) => (next) => (action) => {
  if (action.type === 'TODOS/TODO_ADDED') {
    setTimeout(() => console.log('Added a new todo: ', action.payload), 1000)
  }
  return next(action)
}

const middlewareEnhancer = applyMiddleware(loggerMiddleWare, delayedMiddleware)
// const store = createStore(rootReducer, preLoadedState, middlewareEnhancer)

//Setup for redux dev tool extension
// const devToolMiddleware = composeWithDevTools(
//   applyMiddleware(loggerMiddleWare, delayedMiddleware)
// )
const devToolMiddleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(rootReducer, preLoadedState, devToolMiddleware)

// const store = createStore(rootReducer, preLoadedState, combinedEnhancers)
export const selectTodos = (state) => state.todos
export const selectFilter = (state) => state.filters

export default store
