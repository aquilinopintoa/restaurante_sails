import React, { Component } from 'react';
import { build, actions } from '../../container_helpers'

class Chef extends Component {

  async componentWillMount() {
    await this.props.getAllOrders()
  }

  render() {
    return (
      <div>
          <h1 className="App-title">Chef</h1>
          {this.props.orders.map(order => {
            console.log(order.id)
            return <div key={order.id}>{order.client_name}</div>
          })}
      </div>
    );
  }
}

const mapDispatchToProps = {
  getAllOrders: actions.orders.getAll,
}

const mapStateToProps = state => {
  return {
    platos: state.platos,
    orders: state.orders
  }
}

export default build({
  component: Chef,
  mapDispatchToProps,
  mapStateToProps,
})