import { handleActions } from 'redux-actions'

const defaultState = []

const reducerMap = {
  'ORDENES/GET': (state, { payload }) => payload,
  'ORDENES/ADD': (state, { payload }) => state.concat([payload]),
  'ORDENES/PUT': (state, { payload }) =>
    state.map(m => (m.id === payload.id ? payload : m)),
}

export default handleActions(reducerMap, defaultState)