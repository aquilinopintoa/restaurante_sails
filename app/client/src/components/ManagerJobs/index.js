import ManagerJobs from './ManagerJobs'
import { build, actions } from '../../container_helpers'

const mapDispatchToProps = {
  getAllUsers: actions.users.getAll,
}

const mapStateToProps = state => {
  return {
    users: state.users,
  }
}

export default build({
  component: ManagerJobs,
  mapDispatchToProps,
  mapStateToProps,
})