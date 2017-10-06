import React, { Component } from 'react'
import MainMenu from '../MainMenu/MainMenu'

class Layout extends Component {
  render() {
    return (
      <div>
        <MainMenu />
        {this.props.children}
      </div>
    )
  }
}

export default Layout;