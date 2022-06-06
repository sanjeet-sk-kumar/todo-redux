import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import styledComponents from 'styled-components'
import { selectTodos } from '../../store'
import TodoListItem from '../TodoListItem/TodoListItem'
const List = styledComponents.ul`
margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 400px;
    max-height: 400px;
    overflow-y: auto;
`
const selectTodoIds = (state) => state.todos.map((todo) => todo.id)
const TodoList = () => {
  const todoIds = useSelector(selectTodoIds, shallowEqual)
  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })
  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
