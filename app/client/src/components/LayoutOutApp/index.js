import React, { Component } from 'react'
import UserInfo from '../UserInfo'

class LayoutOutApp extends Component {
  render() {
    return (
      <div>
        <UserInfo />
        {this.props.children}
      </div>
    )
  }
}

export default LayoutOutApp;