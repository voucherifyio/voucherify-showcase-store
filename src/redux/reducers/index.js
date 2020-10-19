import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { cartReducer } from './cartReducer';
import { storeReducer } from './storeReducer';
import { IS_OLD_APP_VERSION } from '../constants';
const combinedReducers = combineReducers({
	cartReducer,
	userReducer,
	storeReducer,
});

const rootReducer = (state, action) => {
	// when a 'NEW APP VERSION' action is dispatched it will reset redux state
	if (action.type === IS_OLD_APP_VERSION) {
		// sessionStorage.clear();
		// const cookies = document.cookie.split(';');
		// for (let i = 0; i < cookies.length; i++) {
		// 	const cookie = cookies[i];
		// 	const eqPos = cookie.indexOf('=');
		// 	const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		// 	document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
		// }
		state = undefined;

		// localStorage.clear();
	}

	return combinedReducers(state, action);
};

export default rootReducer;
