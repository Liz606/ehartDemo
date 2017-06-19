import {combineReducers} from 'redux';

import * as cs from '../constants';
import layout from './layout';
import exception from './exception';
import material from './material';

/**
 * a is state, b is action.
*/
const compose = (f, g) => (a, b) => f(g(a, b), b);

// common reducer for all, like other middleware
const commonReducer = domain => (state, action) => {
  if(action.type === cs.SET_UI_ELEMENT && action.domain === domain) {
    return Object.assign({}, state, {[action.payload.key]: action.payload.value});
  }
  // add more common reducer here

  return state;
};

const injectCommonReducer = (reducers) => {
  const newReducers = {};

  Object.keys(reducers).forEach((key) => {
    newReducers[key] = compose(commonReducer(key), reducers[key]);
  });
  return newReducers;
};

const combineReducersPlus = compose(combineReducers, injectCommonReducer);

const rootReducer = combineReducersPlus({
  layout,
  exception,
  material,
});

export default rootReducer;
