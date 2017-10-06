import { createActions } from 'redux-actions'

const { users: usersActions } = createActions({
  USERS: {
    SET: undefined,
  },
})

usersActions.getAll = () => ({ axios }) => async dispatch => {
  const response = await axios.get('/api/users')
  if (response.data.error) console.log(response.data.error) 
  else dispatch(usersActions.set(response.data))
}

export default usersActions
