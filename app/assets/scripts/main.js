import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import NoMatch from './views/404';
import Home from './views/home';
import LocationEdit from './views/location-edit';
import LocationView from './views/location-view';

import store from './state';

const history = createHistory();

class ScrollToTop extends Component {
  componentDidUpdate (prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render () {
    return this.props.children;
  }
}

const ScrollPosition = withRouter(ScrollToTop);

class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className='app-container'>
            <ScrollPosition>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/location/:id/' component={LocationView} />
                <Route exact path='/location/edit/:id/' component={LocationEdit} />
                <Route component={NoMatch} />
              </Switch>
            </ScrollPosition>
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
