import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import config from './config';
import reducer from './reducers';

const logger = createLogger({
  level: 'info',
  collapsed: true,
  predicate: (getState, action) => {
    return (config.environment !== 'production');
  }
});

const initialState = {};

const store = createStore(reducer, initialState, applyMiddleware(
  thunkMiddleware,
  logger
));

export default store;
