import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styledComponents from 'styled-components'
import {
  StatusFilters,
  getSelectedColor,
  getStatusFilter,
  colorFilterChanged,
} from '../../features/filters/filterSlice'
import {
  allTodosCompleted,
  clearCompletedTodos,
} from '../../features/todos/todoSlice'
import { availableColors } from '../../features/filters/color'
const Button = styledComponents.button`
    color: #ffffff;
    background: #1976d2;
    padding: 10px;
    border-radius: 4px;
    font-weight: 700;

    &:disabled, :disabled:hover{
        opacity: 0.5;
    }
`
const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? '' : 's'
  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}

const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key]
    const handleClick = () => onChange(value)
    const className = value === status ? 'selected' : ''
    console.log(value, status, className)
    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })
  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

const ColorFilter = ({ value: colors, onChange }) => {
  const renderedColors = availableColors.map((color) => {
    console.log(colors)
    const checked = colors.includes(color)
    const handleColorChange = () => {
      const changeType = checked ? 'removed' : 'added'
      onChange(color, changeType)
    }

    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handleColorChange}
        />
        <span className="color-block" style={{ backgroundColor: color }}></span>
        {color}
      </label>
    )
  })
  return (
    <div className="filters colorFilters">
      <h5>Filter By Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  )
}
const Footer = () => {
  const { status, colors } = useSelector((state) => state.filters)
  const dispatch = useDispatch()
  const remainingTodos = useSelector((state) => {
    const uncompletedTodos = state.todos.filter((todo) => !todo.completed)
    return uncompletedTodos.length
  })
  const onColorChange = (color, changeType) => {
    dispatch(colorFilterChanged(color, changeType))
  }

  const onMarkAllCompleted = () => dispatch(allTodosCompleted())
  const onClearCompleted = () => dispatch(clearCompletedTodos())
  const onStatusChange = (status) =>
    dispatch({ type: 'FILTERS/STATUS_FILTER_CHANGED', payload: status })
  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={onMarkAllCompleted}>
          Mark All Completed
        </button>
        <button className="button" onClick={onClearCompleted}>
          Clear Completed
        </button>
      </div>
      <RemainingTodos count={remainingTodos} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilter value={colors} onChange={onColorChange} />
    </footer>
  )
}

export default Footer
