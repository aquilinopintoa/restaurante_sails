import React, { Component } from 'react'

export default class CreatorOrders extends Component {
  constructor(props) {
    super(props)
    this.state = { newOrder: { 
        platos: [1,2],
        client_name: '',
        type_payment: 'TDC',
        total: 100.0
    } }
  }

  async createOrder() {
    await this.props.createOrder(this.state.newOrder)
    this.setState({
        newOrder: { 
          platos: [1,2],
          client_name: '',
          type_payment: 'TDC',
          total: 100.0
        },
    })
  }

  save(value, field) {
    const statePrev = this.state.newOrder
    statePrev[field] = value
    this.setState({ newOrder: statePrev})
  }

  render() {
    return (
      <div>
        <div>
          <div>Create New Order</div>
          <input
            type="text"
            onChange={ (event) => this.save(event.target.value, "client_name")}
            value={this.state.newOrder.client_name}
          />
          <button onClick={() => this.createOrder()}>Create</button>
        </div>
      </div>
    )
  }
}