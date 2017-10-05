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
import LoggedContainer from '../../containers/LoggedContainer'
import store from '../../store'

export default class App extends Component {
  render() {
    const history = syncHistoryWithStore(browserHistory, store)
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={LoggedContainer}>
            <IndexRoute name="dashboard" component={Dashboard} />
            <Route
              name="trade-blotter"
              path="/trade-blotter"
              component={TradeBlotter}
            />
            <Route
              name="market-to-market"
              path="/market-to-market"
              component={MarketToMarket}
            />
            <Route
              name="position-reporting"
              path="/position-reporting"
              component={PositionReporting}
            />
            <Route name="accounts" path="/accounts" component={Accounts} />
            <Route
              name="data-import"
              path="/data-import"
              component={DataImport}
            />
          </Route>
          <Redirect from="*" to="/" />
        </Router>
      </Provider>
    )
  }
}
