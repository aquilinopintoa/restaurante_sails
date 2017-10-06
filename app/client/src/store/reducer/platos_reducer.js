import { handleActions } from 'redux-actions'

const defaultState = []

const reducerMap = {
  'PLATOS/GET': (state, { payload }) => { return payload},
}

export default handleActions(reducerMap, defaultState)
