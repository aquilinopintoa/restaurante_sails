import { createActions } from 'redux-actions'

const { users: usersActions } = createActions({
  USERS: {
    ALL: undefined,
  },
})

usersActions.getAll = () => ({ axios }) => async dispatch => {
  const response = await axios.get('/api/users')
  if (response.data.error) console.log(response.data.error) 
  else dispatch(usersActions.all(response.data))
}

export default usersActions
