import users_actions from './users_actions'
import platos_actions from './platos_actions'
import ordenes_actions from './ordenes_actions'

/**
 * Order alphabetically to find easier each reducer
 */
const actions = {
    users: users_actions,
    platos: platos_actions,
    ordenes: ordenes_actions
}

export default actions
