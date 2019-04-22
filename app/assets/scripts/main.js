import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Home from './views/home';
import NoMatch from './views/404';

import store from './store';

const history = createHistory();

class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <main className='page__body' role='main'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route component={NoMatch} />
            </Switch>
          </main>
        </Router>
      </Provider>
    );
  }
}

render(
  <Root store={store} />,
  document.querySelector('#app')
);
