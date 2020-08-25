import {combineReducers} from 'redux';
import {userReducer} from './userReducer'
import {cartReducer} from './cartReducer'
import {shopReducer} from './shopReducer'

export default combineReducers({
  cartReducer,
  userReducer,
  shopReducer,
});