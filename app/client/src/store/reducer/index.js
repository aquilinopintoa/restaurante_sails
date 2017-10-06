import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import usersReducer from './users_reducer'

export default combineReducers({
  routing: routerReducer,
  users: usersReducer
})
