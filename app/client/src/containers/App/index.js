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
import Mesonero from '../../components/Mesonero'
import Chef from '../../components/Chef'

import store from '../../store'

export default class App extends Component {
  render() {
    const history = syncHistoryWithStore(browserHistory, store)
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Layout}>
            <IndexRoute name="home" component={Home} />
            <Route
              name="cajero"
              path="/cajero"
              component={Cajero}
            />
            <Route
              name="mesero"
              path="/mesero"
              component={Mesonero}
            />
            <Route
              name="chef"
              path="/chef"
              component={Chef}
            />
          </Route>
          <Redirect from="*" to="/" />
        </Router>
      </Provider>
    )
  }
}
