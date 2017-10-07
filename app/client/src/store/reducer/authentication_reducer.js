import { handleActions } from 'redux-actions'

const defaultState = {}

const reducerMap = {
  'AUTH/SIGNIN': (state, { payload }) => {return payload},
  'AUTH/OUT': (state) => {return {}},
  'AUTH/GET': (state, { payload }) => {return payload},
}

export default handleActions(reducerMap, defaultState)
