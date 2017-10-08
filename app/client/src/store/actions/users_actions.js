import { createActions } from 'redux-actions'

const { users: usersActions } = createActions({
  USERS: {
    ALL: undefined,
    ADD: undefined
  },
})

usersActions.getAll = () => ({ axios }) => async dispatch => {
  const response = await axios.get('/api/users')
  if (response.data.error) console.log(response.data.error) 
  else dispatch(usersActions.all(response.data))
}

usersActions.create = (data, cb) => ({ axios }) => async dispatch => {
  const response = await axios.post('/api/users', data)
  if (!response.data.error) dispatch(usersActions.add(response.data))
  if (cb) cb(response.data.error)
}

export default usersActions
