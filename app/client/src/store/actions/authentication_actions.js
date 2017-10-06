import { createActions } from 'redux-actions'

const { auth: authActions } = createActions({
  AUTH: {
    SIGNIN: undefined,
  },
})

authActions.login = data => ({ axios }) => async dispatch => {
  const response = await axios.post('/login', data)

  if (response.data.error) return response.data.error
  else dispatch(authActions.signin(response.data))
}

export default authActions