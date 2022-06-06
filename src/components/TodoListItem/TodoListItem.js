import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { availableColors } from '../../features/filters/color'
import styledComponents from 'styled-components'
const Card = styledComponents.div`
    
display: flex;
align-items: center;
`

const CheckBox = styledComponents.input`
background: green;

`
const selectTodoById = (state, todoId) =>
  state.todos.find((todo) => todo.id === todoId)
const TodoListItem = ({ id }) => {
  const dispatch = useDispatch()
  const todo = useSelector((state) => selectTodoById(state, id))
  const { text, completed, color } = todo
  const handleCompletedChanged = () => {
    dispatch({
      type: 'TODOS/TODO_TOGGLED',
      payload: todo.id,
    })
  }

  const colorOptions = availableColors.map((color) => (
    <option key={color} value={color}>
      {color}
    </option>
  ))
  const handleColorChange = (event) =>
    dispatch({
      type: 'TODOS/TODO_COLOR_CHANGED',
      payload: { id, color: event.target.value },
    })
  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment-button">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChange}
          >
            <option value=""></option>
            {colorOptions}
          </select>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
