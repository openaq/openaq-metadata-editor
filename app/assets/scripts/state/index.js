import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import config from '../config';

import locations from './locations/reducers';
import user from './user/reducers';

const logger = createLogger({
  level: 'info',
  collapsed: true,
  predicate: (getState, action) => {
    return (config.environment !== 'production');
  }
});

const initialState = {};

const reducer = combineReducers({
  locations,
  user
});

const store = createStore(reducer, initialState, applyMiddleware(
  thunkMiddleware,
  logger
));

export default store;
