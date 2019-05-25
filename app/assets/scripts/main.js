import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import NoMatch from './views/404';
import Home from './views/home';
import LocationEdit from './views/location-edit';
import LocationView from './views/location-view';

import store from './state';

const history = createHistory();

class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className='page__body'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/location/:id/' component={LocationView} />
              <Route exact path='/location/edit/:id/' component={LocationEdit} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

render(
  <Root store={store} />,
  document.querySelector('#app')
);
