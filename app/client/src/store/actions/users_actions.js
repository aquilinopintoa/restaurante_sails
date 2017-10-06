import { createActions } from 'redux-actions'

const { users: usersActions } = createActions({
  USERS: {
    SET: undefined,
  },
})

usersActions.getAll = () => ({ axios }) => async dispatch => {
  console.log("aqui")
  const response = await axios.get('/api/users')
  console.log(response)
  dispatch(usersActions.set(response.data))
}

export default usersActions
