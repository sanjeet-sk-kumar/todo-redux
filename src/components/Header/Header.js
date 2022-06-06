import React from 'react'
import styledComponents from 'styled-components'
import { useDispatch } from 'react-redux'
import { saveNewTodo } from '../../features/todos/todoSlice'
const Input = styledComponents.input`
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    line-height: 1.4em;
    box-sizing: border-box;
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);

    &:focus, &:hover{
        outline: none;
        border: none;
        box-shadow: inset 0 -2px 1px rgb(0 0 0 / 3%);
    }
`

const Header = () => {
  const [todoText, setTodoText] = React.useState('')
  const dispatch = useDispatch()
  const handleChange = (event) => setTodoText(event.target.value)
  const handleKeyDown = (event) => {
    const trimmedText = event.target.value.trim()
    if (event.key === 'Enter' && trimmedText) {
      // dispatch({ type: 'TODOS/TODO_ADDED', payload: trimmedText })
      const saveNewTodoThunk = saveNewTodo(trimmedText)
      dispatch(saveNewTodoThunk)
      setTodoText('')
    }
  }
  return (
    <div>
      <Input
        type="text"
        placeholder="What needs to be done?"
        value={todoText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default Header
