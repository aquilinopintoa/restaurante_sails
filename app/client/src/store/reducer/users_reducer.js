import { handleActions } from 'redux-actions'

const defaultState = []

const reducerMap = {
  'USERS/SET': (state, { payload }) => {return payload},
}

export default handleActions(reducerMap, defaultState)
