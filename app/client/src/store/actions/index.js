import users_actions from './users_actions'
import platos_actions from './platos_actions'
import orders_actions from './orders_actions'

/**
 * Order alphabetically to find easier each reducer
 */
const actions = {
    users: users_actions,
    platos: platos_actions,
    orders: orders_actions
}

export default actions
