import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserInfo from '../UserInfo'
import MainMenu from '../MainMenu/MainMenu'

import { build, actions } from '../../container_helpers'

class Layout extends Component {

  componentDidMount() {

    if (!this.props.auth.rol) {
      this.props.getUser((err) => {
        if(err)
          this.context.router.push('/')
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props
    const isLoggingOut = prevProps.auth.rol && !this.props.auth.rol
    const isLoggingIn = !prevProps.auth.rol && this.props.auth.rol
    if (isLoggingIn) {
      this.context.router.push('/app/'+this.props.auth.rol.toLowerCase())
    } else if (isLoggingOut) {
      this.context.router.push('/')
    }
  }

  async handlerLogout() {
      await this.props.logout()
  }
  
  render() {
    const styles = {
      userInfoContent: {
        display: "flex",
        justifyContent: "flex-end",
        margin: "15px 0"
      }
    }
    return (
      <div>
        <div style={styles.userInfoContent}>
          <UserInfo 
            user={this.props.auth}
            handlerLogout={this.handlerLogout.bind(this)}/>
        </div>
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = {
  logout: actions.auth.logout,
  getUser: actions.auth.getUser
}

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