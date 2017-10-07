import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserInfo from '../UserInfo'
import MainMenu from '../MainMenu/MainMenu'

import { build, actions } from '../../container_helpers'

class Layout extends Component {

  componentDidMount() {

    if (!this.props.auth.rol) {
      this.context.router.push('/')
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props
    const isLoggingOut = prevProps.auth.rol && !this.props.auth.rol
    const isLoggingIn = !prevProps.auth.rol && this.props.auth.rol
    console.log("paso >>>>>", this.props.auth, isLoggingOut, isLoggingIn)
    if (isLoggingIn) {
      this.context.router.push('/app')
    } else if (isLoggingOut) {
      this.context.router.push('/')
    }
  }
  
  render() {
    return (
      <div>
        <UserInfo user={this.props.auth}/>
        <MainMenu />
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = {}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

Layout.contextTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default build({
  component: Layout,
  mapDispatchToProps,
  mapStateToProps,
})