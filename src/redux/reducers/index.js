import {combineReducers} from 'redux';
import {userReducer} from './userReducer'
import {cartReducer} from './cartReducer'
import {storeReducer} from './storeReducer'

export default combineReducers({
  cartReducer,
  userReducer,
  storeReducer,
});