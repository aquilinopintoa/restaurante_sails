import CreatorJob from './CreatorJob'
import { build, actions } from '../../container_helpers'

const mapDispatchToProps = {
  createUser: actions.users.create,
}

const mapStateToProps = state => {
  return {}
}

export default build({
  component: CreatorJob,
  mapDispatchToProps,
  mapStateToProps,
})