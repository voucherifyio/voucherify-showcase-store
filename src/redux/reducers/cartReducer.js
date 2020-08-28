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
import has from 'lodash.has';
import cloneDeep from 'lodash.clonedeep';
import {isEmpty} from '../utils'

const initialState = {
  items: [],
  totalAmount: 0,
  itemsTotalCount: 0,
  totalAmountAfterDiscount: 0,
  discountedAmount: 0,
  orderId: null,
  discount: null,
  paymentMethod: 'Other',
}

export const cartReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_DISCOUNT_REQUEST: {
      return {
        ...state,
        fetchingDiscount: true,
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

      if (state.discount !== null) {
        const discount = state.discount;

        if (has(discount, 'applicable_to')) {
          const applicableProducts = [];
          let applicableProductInCart = '';
          discount.applicable_to.data.map((e) => applicableProducts.push(e.id));

          for (let i = 0; i < applicableProducts.length; i++) {
            applicableProductInCart = state.items.find(
              (item) => item.id === applicableProducts[i]
            );
          }
          if (
            !isEmpty(applicableProductInCart) &&
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
            !isEmpty(applicableProducts) &&
            discount.discount.type === 'AMOUNT'
          ) {
            const discountedAmount = discount.discount.amount_off;
            totalAmountAfterDiscount =
              applicableProductInCart.totalAmount - discountedAmount;
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
          const discountedAmount = discount.discount.amount_off;

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
        discount: null
      }
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
      const item = cloneDeep(items.find((item) => item.id === product.id));
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
