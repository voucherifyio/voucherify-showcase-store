import {
	PREPARE_MESSAGES,
	GET_MESSAGE,
	REMOVE_MESSAGE,
	CLEAR_MESSAGES,
} from '../constants';

const initialState = {
	webhookMessages: [],
	fetchingMessages: false,
};

export const webhookReducer = (state = initialState, action) => {
	switch (action.type) {
		case REMOVE_MESSAGE: {
			const webhookMessages = [...state.webhookMessages];
			const message = action.payload.message;
			const customerId = action.payload.customerId;
			const newMessage = webhookMessages.find(
				(msg) => msg.customerId === customerId
			);
			newMessage.messages.shift(message);

			return {
				...state,
				webhookMessages,
			};
		}
		case PREPARE_MESSAGES: {
			const customers = action.payload.customers;
			const webhookMessages = state.webhookMessages;
			const msg = [];
			customers.forEach((customer) => {
				if (!webhookMessages.find((msg) => msg.customerId === customer.id)) {
					return msg.push({ customerId: customer.id, messages: [] });
				}
			});

			return {
				...state,
				webhookMessages: [...state.webhookMessages, ...msg],
			};
		}
		case GET_MESSAGE: {
			const webhookMessages = [...state.webhookMessages];
			const message = action.payload.message;
			const customerId = action.payload.customerId;
			const newMessage = webhookMessages.find(
				(msg) => msg.customerId === customerId
			);
			newMessage.messages.push(message);

			return {
				...state,
				webhookMessages,
			};
		}
		case CLEAR_MESSAGES: {
			return {
				webhookMessages: [],
				fetchingMessages: false,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default webhookReducer;
