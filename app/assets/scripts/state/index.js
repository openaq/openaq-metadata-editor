import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import config from '../config';

import editor from './editor';
import locations from './locations';

const logger = createLogger({
  level: 'info',
  collapsed: true,
  predicate: (getState, action) => {
    return (config.environment !== 'production');
  }
});

const initialState = {};

const reducer = combineReducers({
  editor,
  locations
});

const store = createStore(reducer, initialState, applyMiddleware(
  thunkMiddleware,
  logger
));

export default store;
