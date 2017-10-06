import { connect } from 'react-redux'

import Actions from './store/actions'

export const actions = Actions 

export function build({
  component,
  mapDispatchToProps,
  mapStateToProps,
  propTypes,
}) {
  const container = connect(mapStateToProps, mapDispatchToProps)(component)
  container.displayName = `${component.name}Container`
  container.propTypes = propTypes
  return container
}
