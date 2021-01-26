import { toast } from 'react-toastify';
import {
	setRedemptionPayload,
	setOrderPayload,
	setValidatePayload,
	sendPayload,
} from '../../utils';
import _cloneDeep from 'lodash.clonedeep';
import _isEmpty from 'lodash.isempty';
import {
	GET_DISCOUNT_REQUEST,
	GET_DISCOUNT_SUCCESS,
	GET_DISCOUNT_ERROR,
	SET_ORDER_ID,
	REMOVE_ITEM,
	CLEAR_CART,
	INCREMENT_DECREMENT,
	SET_CART,
	GET_TOTALS,
	SET_PAYMENT_METHOD,
	REMOVE_DISCOUNT,
} from '../constants';
import { updateGiftCardBalance } from './userActions';

export const getDiscountRequest = () => {
	return { type: GET_DISCOUNT_REQUEST };
};

export const addProductReward = (productReward) => {
	return { type: 'ADD_PRODUCT_REWARD', payload: { productReward } };
};

export const getDiscountError = () => {
	return { type: GET_DISCOUNT_ERROR };
};

export const getDiscountSuccess = (discount) => {
	return { type: GET_DISCOUNT_SUCCESS, payload: { discount } };
};

export const removeDiscount = () => {
	return { type: REMOVE_DISCOUNT };
};

export const setOrderId = (orderId) => {
	return { type: SET_ORDER_ID, payload: { orderId } };
};

export const removeItem = (items) => {
	return { type: REMOVE_ITEM, payload: { items } };
};

export const clearCart = () => {
	return { type: CLEAR_CART };
};

export const setPaymentMethod = (paymentMethod) => {
	return { type: SET_PAYMENT_METHOD, payload: { paymentMethod } };
};

export const incrementOrDecrementItem = (id, type) => {
	return { type: INCREMENT_DECREMENT, payload: { id, type } };
};

export const setCart = (product, qt, type) => {
	return { type: SET_CART, payload: { product, qt, type } };
};

export const getTotals = () => {
	return { type: GET_TOTALS };
};

export const addItemToCart = (id, qt, type = 'change_count') => (
	dispatch,
	getState
) => {
	const getItem = (id) => {
		const tempProducts = getState().storeReducer.products;
		const product = _cloneDeep(tempProducts.find((item) => item.id === id));
		return product;
	};
	const product = getItem(id);
	dispatch(setCart(product, qt, type));
};

export const removePromotionFromCart = () => (dispatch) => {
	dispatch(removeDiscount());
};

export const removeItemFromCart = (id) => (dispatch, getState) => {
	const items = getState().cartReducer.items.filter((item) => item.id !== id);
	if (items.length === 0) {
		dispatch(clearCart());
	} else {
		dispatch(removeItem(items));
	}
};

export const getCartDiscount = (activeCartDiscount) => async (
	dispatch,
	getState
) => {
	const { currentCustomer, campaigns } = getState().userReducer;
	const { totalAmount, items, paymentMethod } = getState().cartReducer;
	const getCartDiscountPayload = setValidatePayload(
		currentCustomer,
		totalAmount,
		items,
		paymentMethod
	);
	try {
		dispatch(getDiscountRequest());
		const promotion = await new Promise((resolve, reject) => {
			window.Voucherify.setIdentity(currentCustomer.source_id);

			const promotionCampaigns = campaigns.find(
				(camp) => camp.id === activeCartDiscount
			).tiers;
			window.Voucherify.validate(getCartDiscountPayload, (res) => {
				const promotions = res.promotions;
				const foundPromotions = promotions.filter((o1) =>
					promotionCampaigns.some((o2) => o1.id === o2.id)
				);

				// We're selecting the current highest promotion tier
				const discount = foundPromotions[0];

				if (discount) {
					resolve(discount);
				} else {
					toast.error('You are not eligible for the Cart Discount');
					reject(new Error(res.reason));
				}
			});
		});

		if (promotion) {
			dispatch(getDiscountSuccess(promotion));
			toast.success(promotion.banner || 'Cart Discount applied');
		} else {
			toast.error('You are not eligible for the Cart Discount');
		}
	} catch (error) {
		console.log('[getCartDiscount]', error);
		dispatch(getDiscountError());
	}
};

export const getDiscount = (voucherCode) => async (dispatch, getState) => {
	const { currentCustomer } = getState().userReducer;
	const { totalAmount, items, paymentMethod } = getState().cartReducer;
	const getDiscountPayload = setValidatePayload(
		currentCustomer,
		totalAmount,
		items,
		paymentMethod
	);
	getDiscountPayload.code = voucherCode;
	try {
		dispatch(getDiscountRequest());
		const discount = await new Promise((resolve, reject) => {
			window.Voucherify.setIdentity(currentCustomer.source_id);
			window.Voucherify.validate(getDiscountPayload, (res) => {
				if (res.valid) {
					resolve(res);
				} else {
					if (res.error) {
						toast.error(res.error.message);
					} else {
						toast.error(res.reason);
					}
					reject(new Error(res.reason));
				}
			});
		});

		if (
			discount?.discount?.effect === 'ADD_NEW_ITEMS' &&
			!items.find((i) => i.id === discount.discount.unit_type)
		) {
			dispatch(
				addItemToCart(
					discount.discount.unit_type,
					discount.discount.unit_off,
					'increment_count'
				)
			);
		}
		dispatch(getDiscountSuccess(discount));
	} catch (error) {
		console.log('[getDiscount]', error);
		dispatch(getDiscountError());
	}
};

export const checkoutCart = () => async (dispatch, getState) => {
	const { currentCustomer } = getState().userReducer;
	const {
		totalAmount,
		paymentMethod,
		items,
		discount,
	} = getState().cartReducer;
	try {
		// If voucher or promotion is not applied
		if (_isEmpty(discount)) {
			const checkoutPayload = setOrderPayload(
				currentCustomer,
				totalAmount,
				items,
				paymentMethod
			);
			checkoutPayload.status = 'PAID';
			await sendPayload(checkoutPayload, 'order');
			dispatch(clearCart());
		} else {
			const checkoutPayload = setRedemptionPayload(
				currentCustomer,
				totalAmount,
				items,
				paymentMethod
			);
			if (discount.hasOwnProperty('code') && discount.hasOwnProperty('gift')) {
				const discountCode = discount.code;
				const giftCardBalanceAfterRedemption =
					discount.gift.balance - discount.order.discount_amount;
				const campaignName = discount.campaign;
				checkoutPayload.code = discountCode;
				const giftCardCode = discountCode;
				await sendPayload(checkoutPayload, 'redeem');
				dispatch(clearCart());
				dispatch(
					updateGiftCardBalance(
						campaignName,
						giftCardCode,
						giftCardBalanceAfterRedemption
					)
				);
			} else if (discount.hasOwnProperty('code')) {
				// If voucher is applied
				const discountCode = discount.code;
				checkoutPayload.code = discountCode;
				await sendPayload(checkoutPayload, 'redeem');
				dispatch(clearCart());
			} else if (discount.hasOwnProperty('banner')) {
				// If promotion is applied
				const promotionId = discount.id;
				checkoutPayload.promotionId = promotionId;
				await sendPayload(checkoutPayload, 'redeem');
				dispatch(clearCart());
			}
		}
	} catch (error) {
		toast.error('There was a problem with your purchase');
		console.log('[checkoutCart]', error);
	}
};
