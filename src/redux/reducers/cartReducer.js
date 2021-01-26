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
import _has from 'lodash.has';
import _cloneDeep from 'lodash.clonedeep';
import _isEmpty from 'lodash.isempty';

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
			let { totalAmount, itemsTotalCount } = state.items.reduce(
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
			const discountedAmount = 0;
			const discount = state.discount;

			if (discount !== null) {
				const discountedProduct = state.items.find(
					(i) => i.id === discount.discount.unit_type
				);

				if (_has(discount.discount, 'unit_off') && discountedProduct) {
					const discountedAmount =
						discountedProduct.price * discount.discount.unit_off;

					totalAmountAfterDiscount = totalAmount - discountedAmount;
					if (totalAmountAfterDiscount < 0) {
						totalAmountAfterDiscount = 0;
					}
					return {
						...state,
						totalAmount,
						itemsTotalCount,
						totalAmountAfterDiscount,
						discountedAmount,
					};
				}
				if (
					_has(discount, 'applicable_to') &&
					discount.applicable_to.total > 0
				) {
					const applicableProducts = [];
					let applicableProductInCart = '';
					discount.applicable_to.data.map((e) => applicableProducts.push(e.id));

					for (let i = 0; i < applicableProducts.length; i++) {
						applicableProductInCart = state.items.find(
							(item) => item.id === applicableProducts[i]
						);
					}
					if (
						!_isEmpty(applicableProductInCart) &&
						discount.discount.type === 'PERCENT'
					) {
						let discountedAmount =
							applicableProductInCart.price *
							(discount.discount.percent_off / 100);

						if (
							discount.discount.amount_limit &&
							discount.discount.amount_limit < discountedAmount
						) {
							discountedAmount = discount.discount.amount_limit;
						}
						totalAmountAfterDiscount = totalAmount - discountedAmount;
						if (totalAmountAfterDiscount < 0) {
							totalAmountAfterDiscount = 0;
						}
						return {
							...state,
							totalAmount,
							itemsTotalCount,
							totalAmountAfterDiscount,
							discountedAmount,
						};
					} else if (
						!_isEmpty(applicableProducts) &&
						discount.discount.type === 'AMOUNT'
					) {
						let discountedAmount;

						if (discount.discount.amount_off < totalAmount) {
							discountedAmount = discount.discount.amount_off;
						} else if (discount.discount.amount_off >= totalAmount) {
							discountedAmount = totalAmount;
						}
						totalAmountAfterDiscount = totalAmount - discountedAmount;
						if (totalAmountAfterDiscount < 0) {
							totalAmountAfterDiscount = 0;
						}

						return {
							...state,
							totalAmount,
							itemsTotalCount,
							totalAmountAfterDiscount,
							discountedAmount,
						};
					}
					return {
						...state,
						totalAmount,
						itemsTotalCount,
						totalAmountAfterDiscount,
						discountedAmount,
					};
				} else if (_has(discount, 'gift')) {
					let discountedAmount;

					if (discount.gift.balance < totalAmount) {
						discountedAmount = discount.gift.balance;
					} else if (discount.gift.balance >= totalAmount) {
						discountedAmount = totalAmount;
					}
					totalAmountAfterDiscount = totalAmount - discountedAmount;
					if (totalAmountAfterDiscount < 0) {
						totalAmountAfterDiscount = 0;
					}

					return {
						...state,
						totalAmount,
						itemsTotalCount,
						totalAmountAfterDiscount,
						discountedAmount,
					};
				} else if (discount.hasOwnProperty('loyalty')) {
					let discountedAmount;

					if (discount.order.discount_amount < totalAmount) {
						discountedAmount = discount.order.discount_amount;
					} else if (discount.order.discount_amount >= totalAmount) {
						discountedAmount = totalAmount;
					}
					totalAmountAfterDiscount = totalAmount - discountedAmount;
					if (totalAmountAfterDiscount < 0) {
						totalAmountAfterDiscount = 0;
					}

					return {
						...state,
						totalAmount,
						itemsTotalCount,
						totalAmountAfterDiscount,
						discountedAmount,
					};
				} else if (discount.discount.type === 'PERCENT') {
					let discountedAmount =
						totalAmount * (discount.discount.percent_off / 100);

					if (
						discount.discount.amount_limit &&
						discount.discount.amount_limit < discountedAmount
					) {
						discountedAmount = discount.discount.amount_limit;
					}

					totalAmountAfterDiscount = totalAmount - discountedAmount;

					if (totalAmountAfterDiscount < 0) {
						totalAmountAfterDiscount = 0;
					}

					return {
						...state,
						totalAmount,
						itemsTotalCount,
						totalAmountAfterDiscount,
						discountedAmount,
					};
				} else if (discount.discount.type === 'AMOUNT') {
					let discountedAmount;

					if (discount.discount.amount_off < totalAmount) {
						discountedAmount = discount.discount.amount_off;
					} else if (discount.discount.amount_off >= totalAmount) {
						discountedAmount = totalAmount;
					}
					totalAmountAfterDiscount = totalAmount - discountedAmount;
					if (totalAmountAfterDiscount < 0) {
						totalAmountAfterDiscount = 0;
					}

					return {
						...state,
						totalAmount,
						itemsTotalCount,
						totalAmountAfterDiscount,
						discountedAmount,
					};
				}

				if (totalAmountAfterDiscount < 0) {
					totalAmountAfterDiscount = 0;
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
