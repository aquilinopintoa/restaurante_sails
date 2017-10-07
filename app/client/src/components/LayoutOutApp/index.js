import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserInfo from '../UserInfo'

import { build, actions } from '../../container_helpers'

class LayoutOutApp extends Component {

  async componentDidMount() {
    if (!this.props.auth.rol) {
      const result = await this.props.getUser()
    }else{
      this.context.router.push('/app')
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props
    const isLoggingOut = prevProps.auth.rol && !this.props.auth.rol
    const isLoggingIn = !prevProps.auth.rol && this.props.auth.rol
    
    if (isLoggingIn) {
      console.log(this.props.auth.rol.toLowerCase())  
      this.context.router.push('/app/'+this.props.auth.rol.toLowerCase())
    } else if (isLoggingOut) {
      this.context.router.push('/')
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = {
  getUser: actions.auth.getUser
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

LayoutOutApp.contextTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default build({
  component: LayoutOutApp,
  mapDispatchToProps,
  mapStateToProps,
})