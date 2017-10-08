import { createActions } from 'redux-actions'

const { auth: authActions } = createActions({
  AUTH: {
    SIGNIN: undefined,
    GET: undefined, 
    OUT: undefined
  },
})

authActions.login = (data, cb) => ({ axios }) => async dispatch => {
  const response = await axios.post('/login', data)

  if (!response.data.error){
    dispatch(authActions.signin(response.data))
  }

  if(cb) cb(response.data.error)
}

authActions.logout = (cb) => ({ axios }) => async dispatch => {
  const response = await axios.post('/logout')

  if (!response.data.error){
    dispatch(authActions.out())
  }

  if(cb) cb(response.data.error)
}

authActions.getUser = (cb) => ({ axios }) => async dispatch => {
  const response = await axios.get('/api/user')

  if (!response.data.error) dispatch(authActions.get(response.data))
  if(cb) cb(response.data.error)
}

export default authActions