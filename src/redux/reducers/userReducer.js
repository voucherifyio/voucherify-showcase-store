import {
	START_USER_SESSION_ERROR,
	START_USER_SESSION_SUCCESS,
	START_USER_SESSION_REQUEST,
	GET_CUSTOMERS_ERROR,
	GET_CUSTOMERS_REQUEST,
	GET_CUSTOMERS_SUCCESS,
	GET_CURRENT_CUSTOMER_SUCCESS,
	GET_CAMPAIGNS_ERROR,
	GET_CAMPAIGNS_REQUEST,
	GET_CAMPAIGNS_SUCCESS,
	GET_VOUCHERS_REQUEST,
	GET_VOUCHERS_ERROR,
	GET_VOUCHERS_SUCCESS,
	GET_CURRENT_CUSTOMER_ERROR,
	GET_CURRENT_CUSTOMER_REQUEST,
	GET_QUALIFICATIONS_REQUEST,
	GET_QUALIFICATIONS_SUCCESS,
	GET_QUALIFICATIONS_ERROR,
	SET_PAYMENT_METHOD,
	SET_ENABLE_CART_DISCOUNTS,
	REMOVE_CURRENT_CUSTOMER,
	ENABLE_SIDEBAR,
	DISABLE_SIDEBAR,
	SET_CURRENT_CART_DISCOUNT,
	ADD_PUBLISHED_CODES,
	ADD_NEW_CUSTOMERS_SUCCESS,
	SET_CURRENT_APP_VERSION,
	UPDATE_GIFT_CARD_BALANCE,
	SET_API_RESPONSE,
	SET_API_CALL,
} from '../constants';
import _isEmpty from 'lodash.isempty';

const initialState = {
	currentCustomer: null,
	productRewards: [],
	customers: null,
	publishedCodes: null,
	campaigns: null,
	promotions: null,
	vouchers: null,
	qualifications: null,
	paymentMethod: 'Other',
	sessionId: null,
	fetchingCoupons: false,
	fetchingPromotions: false,
	fetchingCustomer: false,
	fetchingQualifications: false,
	fetchingSessionId: false,
	fetchingCustomers: true,
	enableCartDiscounts: false,
	enableSidebar: false,
	currentCartDiscount: null,
	appVersion: null,
	apiResponse: null,
	apiCall: null,
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_API_RESPONSE: {
			return {
				...state,
				apiResponse: action.payload.apiResponse,
			};
		}
		case SET_API_CALL: {
			return {
				...state,
				apiCall: action.payload.apiCall,
			};
		}
		case UPDATE_GIFT_CARD_BALANCE: {
			const giftCardBalanceAfterRedemption =
				action.payload.giftCardBalanceAfterRedemption;
			const campaigns = state.campaigns;

			campaigns
				.find((camp) => camp.name === action.payload.campaignName)
				.coupons.find(
					(coupon) => coupon.code === action.payload.giftCardCode
				).giftCardBalance = giftCardBalanceAfterRedemption;

			return { ...state, campaigns };
		}
		case ADD_NEW_CUSTOMERS_SUCCESS: {
			return {
				...state,
				publishedCodes: [
					...state.publishedCodes,
					...action.payload.publishedCodes,
				],
			};
		}
		case SET_CURRENT_CART_DISCOUNT: {
			return {
				...state,
				currentCartDiscount: action.payload.currentCartDiscount,
			};
		}
		case START_USER_SESSION_REQUEST: {
			return {
				...state,
				fetchingSessionId: true,
			};
		}
		case ENABLE_SIDEBAR: {
			return {
				...state,
				enableSidebar: action.payload.enableSidebar,
			};
		}
		case DISABLE_SIDEBAR: {
			return {
				...state,
				enableSidebar: false,
			};
		}
		case ADD_PUBLISHED_CODES: {
			const publishedCodes = state.publishedCodes;
			const custIndex = publishedCodes.findIndex(
				(customer) =>
					customer.currentCustomer === action.payload.currentCustomer
			);
			// We're checking if the code was published - if yes, we're skipping this.
			if (
				!publishedCodes[custIndex].campaigns.find(
					(camps) => camps.code === action.payload.campaign.code
				)
			) {
				publishedCodes[custIndex].campaigns.push(action.payload.campaign);
				return {
					...state,
					publishedCodes: publishedCodes,
				};
			}
			return {
				...state,
			};
		}
		case START_USER_SESSION_SUCCESS: {
			return {
				...state,
				sessionId: action.payload.sessionId,
				publishedCodes: action.payload.publishedCodes,
				fetchingSessionId: false,
				fetchingSessionIdError: false,
			};
		}
		case SET_CURRENT_APP_VERSION: {
			return {
				...state,
				appVersion: action.payload.appVersion,
			};
		}
		case START_USER_SESSION_ERROR: {
			return {
				...state,
				fetchingSessionId: false,
				fetchingSessionIdError: true,
			};
		}
		case SET_ENABLE_CART_DISCOUNTS: {
			return {
				...state,
				enableCartDiscounts: action.payload.enableCartDiscounts,
			};
		}
		case GET_CUSTOMERS_REQUEST: {
			return {
				...state,
				fetchingCustomers: true,
			};
		}
		case GET_CUSTOMERS_SUCCESS: {
			return {
				...state,
				customers: action.payload.customers,
				fetchingCustomers: false,
				fetchingCustomersError: false,
			};
		}
		case GET_CUSTOMERS_ERROR: {
			return {
				...state,
				fetchingCustomersError: true,
			};
		}
		case GET_CAMPAIGNS_REQUEST: {
			return {
				...state,
				fetchingCoupons: true,
			};
		}
		case GET_CAMPAIGNS_SUCCESS: {
			const newCampaigns = action.payload.campaigns;
			const oldCampaigns = state.campaigns;

			if (oldCampaigns !== null) {
				newCampaigns.forEach((camp) => {
					camp.coupons.forEach((coupon) => {
						if (
							!_isEmpty(
								oldCampaigns.find((c) => c.name === camp.name).coupons
							) &&
							!_isEmpty(
								oldCampaigns
									.find((c) => c.name === camp.name)
									.coupons.find((cu) => cu.code === coupon.code)
							) &&
							oldCampaigns
								.find((c) => c.name === camp.name)
								.coupons.find((cu) => cu.code === coupon.code)
								.hasOwnProperty('giftCardBalance')
						) {
							if (
								coupon.hasOwnProperty('giftCardAmount') &&
								coupon.giftCardAmount >
									oldCampaigns
										.find((c) => c.name === camp.name)
										.coupons.find((cu) => cu.code === coupon.code)
										.giftCardBalance
							) {
								coupon.giftCardBalance = oldCampaigns
									.find((c) => c.name === camp.name)
									.coupons.find(
										(cu) => cu.code === coupon.code
									).giftCardBalance;
							}
						}
					});
				});
				return {
					...state,
					campaigns: newCampaigns,
					fetchingCoupons: false,
				};
			} else {
				return {
					...state,
					campaigns: action.payload.campaigns,
					fetchingCoupons: false,
				};
			}
		}
		case GET_CAMPAIGNS_ERROR: {
			return {
				...state,
				fetchingCampaignsError: true,
			};
		}

		case GET_VOUCHERS_REQUEST: {
			return {
				...state,
			};
		}
		case GET_VOUCHERS_SUCCESS: {
			return {
				...state,
				vouchers: action.payload.vouchers,
				fetchingCoupons: false,
			};
		}
		case GET_VOUCHERS_ERROR: {
			return {
				...state,
				fetchingVouchersError: true,
			};
		}
		case GET_CURRENT_CUSTOMER_REQUEST: {
			return {
				...state,
				fetchingCustomer: true,
			};
		}
		case GET_CURRENT_CUSTOMER_SUCCESS: {
			let currentCustomer;
			if (
				!_isEmpty(state.currentCustomer) &&
				!_isEmpty(state.currentCustomer.assets)
			) {
				currentCustomer = {
					...action.payload.currentCustomer,
					assets: { ...action.payload.currentCustomer.assets },
				};
			} else {
				currentCustomer = {
					...action.payload.currentCustomer,
				};
			}

			return {
				...state,
				currentCustomer,
				fetchingCustomer: false,
			};
		}
		case GET_CURRENT_CUSTOMER_ERROR: {
			return {
				...state,
				fetchingCustomerError: true,
			};
		}
		case REMOVE_CURRENT_CUSTOMER: {
			return {
				...state,
				currentCustomer: null,
			};
		}
		case GET_QUALIFICATIONS_REQUEST: {
			return {
				...state,
				fetchingQualifications: true,
			};
		}
		case GET_QUALIFICATIONS_SUCCESS: {
			return {
				...state,
				fetchingQualifications: false,
				qualifications: action.payload.qualifications,
			};
		}
		case GET_QUALIFICATIONS_ERROR: {
			return {
				...state,
				fetchingQualificationsError: true,
			};
		}
		case SET_PAYMENT_METHOD: {
			return {
				...state,
				paymentMethod: action.payload.paymentMethod,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default userReducer;
