import { createActions } from 'redux-actions'

const { platos: platosActions } = createActions({
  PLATOS: {
    GET: undefined,
  },
})

platosActions.getAll = () => ({ axios }) => async dispatch => {
  const response = await axios.get('/api/platos')
  if (response.data.error) console.log(response.data.error) 
  else dispatch(platosActions.get(response.data))
}

export default platosActions
