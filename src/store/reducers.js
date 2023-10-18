import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import projectReducer from './project/reducers';
import taskReducer from './task/reducers';

import history from './util/history';


/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    project : projectReducer,
    task : taskReducer
  });
  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
