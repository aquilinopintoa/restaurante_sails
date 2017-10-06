import React, { Component } from 'react';
import { build, actions } from '../../container_helpers'

import CreatorOrders from '../CreatorOrders'

class Cajero extends Component {

  async componentWillMount() {
    await this.props.getAllPlatos()
  }

  render() {
    return (
      <div>
          <h1 className="App-title">Cajero</h1>
          {this.props.platos.map(plato => {
            return <div key={plato.id}>{plato.name}</div>
          })}

          <CreatorOrders/>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getAllPlatos: actions.platos.getAll,
}

const mapStateToProps = state => {
  return {
    platos: state.platos,
  }
}

export default build({
  component: Cajero,
  mapDispatchToProps,
  mapStateToProps,
})