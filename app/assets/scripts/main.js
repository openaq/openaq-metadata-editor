import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import App from './views/app';
import NoMatch from './views/404';
import Home from './views/home';
import LocationEdit from './views/location-edit';
import LocationView from './views/location-view';
import Callback from './views/callback';
import Login from './views/login';

import store from './state';
import history from './services/history';
import auth from './services/auth';

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

// The Private route has to be connected to the state to ensure it refreshes
// once the user logs in. Otherwise we'd see only the Login page.
const PrivateRoute = connect(
  state => ({
    user: state.user
  }),
  {}
)(props => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props => auth.isAuthenticated()
        ? <Component {...props} />
        : <Login />
      }
    />
  );
});

class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <App>
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute
                exact
                path='/location/:id/'
                component={LocationView}
              />
              <PrivateRoute
                exact
                path='/location/edit/:id/'
                component={LocationEdit}
              />
              <Route
                path='/callback'
                render={props => {
                  handleAuthentication(props);
                  return <Callback {...props} />;
                }}
              />
              <Route component={NoMatch} />
            </Switch>
          </App>
        </Router>
      </Provider>
    );
  }
}

render(<Root />, document.querySelector('#app'));
