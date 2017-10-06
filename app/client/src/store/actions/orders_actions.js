import { createActions } from 'redux-actions'

const { ordenes: ordenesActions } = createActions({
  ORDENES: {
    GET: undefined,
    ADD: undefined,
    PUT: undefined,
  },
})

ordenesActions.getAll = () => ({ axios }) => async dispatch => {
  const response = await axios.get('/api/ordenes')
  if (response.data.error) console.log(response.data.error) 
  else dispatch(ordenesActions.get(response.data))
}

ordenesActions.create = data => ({ axios }) => async dispatch => {
  const response = await axios.post('/api/ordenes', data)
  if (response.data.error) console.log(response.data.error) 
  else dispatch(ordenesActions.add(response.data))
}

ordenesActions.update = data => ({ axios }) => async dispatch => {
  const response = await axios.put(`/api/ordenes`, data)
  if (response.data.error) console.log(response.data.error) 
  else dispatch(ordenesActions.put(response.data))
}

export default ordenesActions