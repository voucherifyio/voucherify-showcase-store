import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { cartReducer } from './cartReducer';
import { storeReducer } from './storeReducer';
import { webhookReducer } from './webhookReducer';
import { IS_OLD_APP_VERSION } from '../constants';

const combinedReducers = combineReducers({
	cartReducer,
	userReducer,
	storeReducer,
	webhookReducer,
});

const rootReducer = (state, action) => {
	// 	when a 'NEW APP VERSION' action is dispatched it will reset redux state
	if (action.type === IS_OLD_APP_VERSION) {
		sessionStorage.clear();
		localStorage.clear();
		state = undefined;
	}

	return combinedReducers(state, action);
};

export default rootReducer;
