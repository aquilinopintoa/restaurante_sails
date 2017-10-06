import React, { Component } from 'react'
import UserInfo from '../UserInfo'
import MainMenu from '../MainMenu/MainMenu'

class Layout extends Component {
  
  render() {
    return (
      <div>
        <UserInfo />
        <MainMenu />
        {this.props.children}
      </div>
    )
  }
}
export default Layout
// const mapDispatchToProps = {}

// const mapStateToProps = state => {
//   return {
//     auth: state.auth
//   }
// }

// export default build({
//   component: Layout,
//   mapDispatchToProps,
//   mapStateToProps,
// })