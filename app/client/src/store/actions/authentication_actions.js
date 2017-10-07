import { createActions } from 'redux-actions'

const { auth: authActions } = createActions({
  AUTH: {
    SIGNIN: undefined,
    GET: undefined
  },
})

authActions.login = data => ({ axios }) => async dispatch => {
  const response = await axios.post('/login', data)

  if (response.data.error) return response.data.error
  else dispatch(authActions.signin(response.data))
}

authActions.getUser = () => ({ axios }) => async dispatch => {
  const response = await axios.get('/api/user')
  console.log("aquilino", response)
  if (response.data.error) return response.data.error
  else dispatch(authActions.get(response.data))
}

export default authActions