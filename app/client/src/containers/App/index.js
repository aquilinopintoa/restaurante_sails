import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  Redirect,
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Layout from '../../components/Layout'
import Home from '../../components/Home'
import Cajero from '../../components/Cajero'
import Admin from '../../components/Admin'
import Chef from '../../components/Chef'
import Signin from '../../components/Signin'

import store from '../../store'

function loggedIn() {
  return true
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/signin'
    })
  }
}

export default class App extends Component {
  render() {
    const history = syncHistoryWithStore(browserHistory, store)
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/app" component={Layout} onEnter={requireAuth}>
            <IndexRoute name="home" component={Home} />
            <Route
              name="cajero"
              path="/app/cajero"
              component={Cajero}
            />
            <Route
              name="chef"
              path="/app/chef"
              component={Chef}
            />
            <Route
              name="admin"
              path="/app/admin"
              component={Admin}
            />
          </Route>
          <Route path="/" component={Layout}>
            <Route
              name="signin"
              path="/signin"
              component={Signin}
            />
          </Route>
          <Redirect from="*" to="/" />
        </Router>
      </Provider>
    )
  }
}
