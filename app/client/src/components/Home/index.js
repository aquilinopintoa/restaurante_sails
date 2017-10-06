import React, { Component } from 'react';
import './App.css';
import { build, actions } from '../../container_helpers'

class Home extends Component {

  async componentWillMount() {
    await this.props.getAllUsers()
  }

  render() {
    
    return (
      <div>
        <h1 className="App-title">Home</h1>
        {this.props.users.map(user => {
          console.log(user)
          return <div key={user.id}>{user.email}</div>
        })}
      </div>
    );
  }
}

const mapDispatchToProps = {
  getAllUsers: actions.users.getAll,
}

const mapStateToProps = state => {
  return {
    users: state.users,
  }
}

export default build({
  component: Home,
  mapDispatchToProps,
  mapStateToProps,
})