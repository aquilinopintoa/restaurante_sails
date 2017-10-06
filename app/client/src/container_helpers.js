import { connect } from 'react-redux'

//export actions from './store/actions'

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
