import { handleActions } from 'redux-actions'

const defaultState = []

const reducerMap = {
  'USERS/SET': (state, { payload }) => { console.log("hola"); return payload},
}

export default handleActions(reducerMap, defaultState)
