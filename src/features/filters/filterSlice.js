export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const initialState = {
  status: StatusFilters.All,
  colors: [],
}

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTERS/STATUS_FILTER_CHANGED':
      return { ...state, status: action.payload }

    case 'FILTERS/COLOR_FILTER_CHANGED': {
      let { color, changeType } = action.payload
      console.log(action, 'ACTIONS')
      const { colors } = state
      switch (changeType) {
        case 'added': {
          if (colors.includes(color)) return state
          return {
            ...state,
            colors: state.colors.concat(color),
          }
        }
        case 'removed': {
          let index = state.colors.indexOf(action.payload.color)
          return {
            ...state,
            colors: state.colors.splice(index, 1),
          }
        }
        default:
          return state
      }
    }
    default:
      return state
  }
}

export const getSelectedColor = (state) => {
  console.log(state)
  return state.filters.colors
}

export const getStatusFilter = (state) => state.filters.status

export const colorFilterChanged = (color, changeType) => {
  return {
    type: 'FILTERS/COLOR_FILTER_CHANGED',
    payload: { color, changeType },
  }
}

export default filtersReducer
