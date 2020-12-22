import {
	CLEAR_MESSAGES,
	GET_MESSAGE,
	PREPARE_MESSAGES,
	REMOVE_MESSAGE,
} from '../constants';

export const prepareMessages = (customers) => {
	return { type: PREPARE_MESSAGES, payload: { customers } };
};

export const getMessage = (customerId, message) => {
	return { type: GET_MESSAGE, payload: { customerId, message } };
};

export const removeMessage = (customerId) => {
	return { type: REMOVE_MESSAGE, payload: { customerId } };
};

export const clearMessages = () => {
	return { type: CLEAR_MESSAGES };
};
