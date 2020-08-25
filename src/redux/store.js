import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash/throttle';
import {saveState, loadState} from './localStorage'

const preloadedState = loadState()

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;

export const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancer(applyMiddleware(thunkMiddleware)),
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;
