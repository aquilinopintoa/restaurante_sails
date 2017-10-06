import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import usersReducer from './users_reducer'
import platosReducer from './platos_reducer'
import ordenesReducer from './ordenes_reducer'
import authenticationReducer from './authentication_reducer'

export default combineReducers({
  routing: routerReducer,
  users: usersReducer,
  platos: platosReducer,
  orders: ordenesReducer,
  auth: authenticationReducer
})
