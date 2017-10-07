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

  cb(response.data.error)
}

authActions.logout = (cb) => ({ axios }) => async dispatch => {
  const response = await axios.post('/logout')

  if (!response.data.error){
    dispatch(authActions.out())
  }

  if(cb) cb(response.data.error)
}

authActions.getUser = () => ({ axios }) => async dispatch => {
  const response = await axios.get('/api/user')
  console.log("aquilino", response)
  if (response.data.error) return response.data.error
  else dispatch(authActions.get(response.data))
}

export default authActions