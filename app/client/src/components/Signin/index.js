import Signin from './Signin'
import { build, actions } from '../../container_helpers'

const mapDispatchToProps = {
  login: actions.auth.login
}

const mapStateToProps = state => {
  return {}
}

export default build({
  component: Signin,
  mapDispatchToProps,
  mapStateToProps,
})