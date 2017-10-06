import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router'
import { build } from '../../container_helpers'
import './LinkMenu.css'

const LinkMenu = props => (
  <li className={props.routes === `/${props.to}` ? 'active' : ''}>
    <Link to={`/${props.to}`}>{props.itemName}</Link>
  </li>
)

LinkMenu.propTypes = {
  to: PropTypes.string,
  itemName: PropTypes.string.isRequired,
  routes: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
  return {
    routes: state.routing.locationBeforeTransitions.pathname,
  }
}

export default build({
  component: LinkMenu,
  mapStateToProps,
})
