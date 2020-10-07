import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { cartReducer } from './cartReducer';
import { storeReducer } from './storeReducer';
import { NEW_APP_VERSION } from '../constants';
const combinedReducers = combineReducers({
  cartReducer,
  userReducer,
  storeReducer,
});

const rootReducer = (state, action) => {
  // when a 'NEW APP VERSION' action is dispatched it will reset redux state
  if (action.type === NEW_APP_VERSION) {
    state = undefined;
  }

  return combinedReducers(state, action);
};

export default rootReducer;
