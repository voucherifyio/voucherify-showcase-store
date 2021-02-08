import {
	INCREMENT_DECREMENT,
	SET_CART,
	GET_DISCOUNT_ERROR,
	CLEAR_CART,
	GET_DISCOUNT_SUCCESS,
	GET_DISCOUNT_REQUEST,
	SET_ORDER_ID,
	GET_TOTALS,
	REMOVE_ITEM,
	SET_PAYMENT_METHOD,
	REMOVE_DISCOUNT,
} from '../constants';
import _cloneDeep from 'lodash.clonedeep';

const initialState = {
	items: [],
	productRewards: [],
	totalAmount: 0,
	itemsTotalCount: 0,
	totalAmountAfterDiscount: 0,
	discountedAmount: 0,
	orderId: null,
	discount: null,
	paymentMethod: 'Other',
};

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_DISCOUNT_REQUEST: {
			return {
				...state,
				fetchingDiscount: true,
			};
		}
		case 'ADD_PRODUCT_REWARD': {
			return {
				...state,
				productRewards: [...state.productRewards, action.payload.productReward],
			};
		}
		case GET_TOTALS: {
			// eslint-disable-next-line prefer-const
			const { totalAmount, itemsTotalCount } = state.items.reduce(
				(items, currentItem) => {
					const { price, count } = currentItem;
					const itemTotalAmount = price * count;
					items.totalAmount += itemTotalAmount;
					items.itemsTotalCount += count;
					return items;
				},
				{
					totalAmount: 0,
					itemsTotalCount: 0,
				}
			);

			let totalAmountAfterDiscount = totalAmount;
			let discountedAmount = 0;
			const voucher = state.discount;

			if (voucher) {
				// We're checking if there is a discount

				if (voucher.applicable_to?.total > 0) {
					// We're checking if discount has 'applicable_to' property and has more than 0 applicalbe products

					let productInCart;
					// We're checking if there are products in cart to which voucher can be applied

					const products = voucher.applicable_to.data.map((e) => e.id);

					for (let i = 0; i < products.length; i++) {
						productInCart = state.items.find((item) => item.id === products[i]);
					}
					if (productInCart && voucher.discount.type === 'PERCENT') {
						// If there is a discounted product in cart and discount type is PERCENT

						discountedAmount =
							productInCart.price * (voucher.discount.percent_off / 100);

						if (
							voucher.discount.amount_limit &&
							voucher.discount.amount_limit < discountedAmount
						) {
							discountedAmount = voucher.discount.amount_limit;
						}

						totalAmountAfterDiscount = totalAmount - discountedAmount;

						if (totalAmountAfterDiscount < 0) {
							totalAmountAfterDiscount = 0;
						}
					} else if (productInCart && voucher.discount.type === 'AMOUNT') {
						// If there is a discounted product in cart and discount type is AMOUNT

						if (voucher.discount.amount_off < totalAmount) {
							discountedAmount = voucher.discount.amount_off;
						} else if (voucher.discount.amount_off >= totalAmount) {
							discountedAmount = totalAmount;
						}
						totalAmountAfterDiscount = totalAmount - discountedAmount;
						if (totalAmountAfterDiscount < 0) {
							totalAmountAfterDiscount = 0;
						}
					}
				} else if (voucher.hasOwnProperty('discount')) {
					// We're checking if discount has 'discount' property

					if (voucher.discount.type === 'UNIT') {
						// We're checking if discount type is UNIT

						const discountedProduct = state.items.find(
							(i) => i.id === voucher.discount.unit_type
						);

						discountedAmount =
							discountedProduct.price * voucher.discount.unit_off;

						totalAmountAfterDiscount = totalAmount - discountedAmount;

						if (totalAmountAfterDiscount < 0) {
							totalAmountAfterDiscount = 0;
						}
					} else if (voucher.discount.type === 'PERCENT') {
						// We're checking if discount type is PERCENT

						discountedAmount =
							totalAmount * (voucher.discount.percent_off / 100);

						if (
							voucher.discount.amount_limit &&
							voucher.discount.amount_limit < discountedAmount
						) {
							discountedAmount = voucher.discount.amount_limit;
						}

						totalAmountAfterDiscount = totalAmount - discountedAmount;

						if (totalAmountAfterDiscount < 0) {
							totalAmountAfterDiscount = 0;
						}
					} else if (voucher.discount.type === 'AMOUNT') {
						// We're checking if discount type is AMOUNT

						if (voucher.discount.amount_off < totalAmount) {
							discountedAmount = voucher.discount.amount_off;
						} else if (voucher.discount.amount_off >= totalAmount) {
							discountedAmount = totalAmount;
						}
						totalAmountAfterDiscount = totalAmount - discountedAmount;

						if (totalAmountAfterDiscount < 0) {
							totalAmountAfterDiscount = 0;
						}
					}
				} else if (voucher.hasOwnProperty('gift')) {
					// We're checking if discount has 'gift' property

					if (voucher.gift.balance < totalAmount) {
						discountedAmount = voucher.gift.balance;
					} else if (voucher.gift.balance >= totalAmount) {
						discountedAmount = totalAmount;
					}
					totalAmountAfterDiscount = totalAmount - discountedAmount;
					if (totalAmountAfterDiscount < 0) {
						totalAmountAfterDiscount = 0;
					}
				} else if (voucher.hasOwnProperty('loyalty')) {
					// We're checking if discount has 'loyalty' property

					if (voucher.order.discount_amount < totalAmount) {
						discountedAmount = voucher.order.discount_amount;
					} else if (voucher.order.discount_amount >= totalAmount) {
						discountedAmount = totalAmount;
					}
					totalAmountAfterDiscount = totalAmount - discountedAmount;
					if (totalAmountAfterDiscount < 0) {
						totalAmountAfterDiscount = 0;
					}
				}
			}
			return {
				...state,
				totalAmount,
				itemsTotalCount,
				totalAmountAfterDiscount,
				discountedAmount,
			};
		}
		case GET_DISCOUNT_SUCCESS: {
			return {
				...state,
				fetchingDiscount: false,
				discount: action.payload.discount,
			};
		}
		case REMOVE_DISCOUNT: {
			return {
				...state,
				discount: null,
			};
		}
		case INCREMENT_DECREMENT: {
			const tempItems = state.items.map((item) => {
				if (item.id === action.payload.id) {
					if (action.payload.type === '+') {
						item = {
							...item,
							count: item.count + 1,
						};
					} else {
						item = {
							...item,
							count: item.count - 1,
						};
					}
				}
				return item;
			});
			return { ...state, items: tempItems };
		}
		case GET_DISCOUNT_ERROR: {
			return {
				...state,
				discount: null,
				fetchingDiscountError: true,
			};
		}
		case REMOVE_ITEM: {
			return {
				...state,
				items: action.payload.items,
			};
		}
		case SET_CART: {
			const product = action.payload.product;
			const quantity = parseInt(action.payload.qt, 10);
			const items = [...state.items];
			const item = _cloneDeep(items.find((item) => item.id === product.id));
			if (item) {
				const selectedProduct = items.find((item) => item.id === product.id);
				if (action.payload.type === 'increment_count') {
					selectedProduct.count += quantity;
				} else {
					selectedProduct.count = quantity;
				}
				selectedProduct.total = selectedProduct.price * selectedProduct.count;
				return { ...state, items: items };
			} else {
				return {
					...state,
					items: [
						...state.items,
						{
							...product,
							count: quantity,
							total: product.price * quantity,
						},
					],
				};
			}
		}
		case SET_PAYMENT_METHOD: {
			return {
				...state,
				paymentMethod: action.payload.paymentMethod,
			};
		}
		case SET_ORDER_ID: {
			return {
				...state,
				orderId: action.payload.orderId,
			};
		}
		case CLEAR_CART: {
			return {
				...state,
				items: [],
				totalAmount: 0,
				itemsTotalCount: 0,
				totalAmountAfterDiscount: 0,
				discountedAmount: 0,
				discount: null,
			};
		}
		default: {
			return state;
		}
	}
};

export default cartReducer;
