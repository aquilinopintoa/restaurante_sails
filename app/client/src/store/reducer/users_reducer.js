import { handleActions } from 'redux-actions'

const defaultState = []

const reducerMap = {
  'USERS/ALL': (state, { payload }) => {return payload},
  'USERS/ADD': (state, { payload }) => state.concat([payload]),
}

export default handleActions(reducerMap, defaultState)
