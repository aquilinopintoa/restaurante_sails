import CreatorOrders from './CreatorOrders'
import { build, actions } from '../../container_helpers'

const mapDispatchToProps = {
  createOrder: actions.orders.create,
}

const mapStateToProps = state => {
  return {
    platos: state.platos,
  }
}

export default build({
  component: CreatorOrders,
  mapDispatchToProps,
  mapStateToProps,
})