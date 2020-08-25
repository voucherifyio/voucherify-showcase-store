import { toast } from 'react-toastify';
import { setRedemptionPayload, setValidatePayload, getOrderId, sendPayload } from '../utils';
import _, { capitalize } from 'lodash';
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
} from '../constants';

export const getDiscountRequest = () => {
  return { type: GET_DISCOUNT_REQUEST };
};

export const getDiscountError = () => {
  return { type: GET_DISCOUNT_ERROR };
};

export const getDiscountSuccess = (discount) => {
  return { type: GET_DISCOUNT_SUCCESS, payload: { discount } };
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

export const incrementOrDecrementItem = (id, type) => {
  return { type: INCREMENT_DECREMENT, payload: { id, type } };
};

export const setCart = (product, qt, type) => {
  return { type: SET_CART, payload: { product, qt, type} };
};

export const getTotals = () => {
  return { type: GET_TOTALS };
};

export const addItemToCart = (id, qt, type = 'change_count') => (dispatch, getState) => {
  const getItem = (id) => {
    const tempProducts = getState().shopReducer.products;
    const product = _.cloneDeep(tempProducts.find((item) => item.id === id));
    return product;
  };
  const product = getItem(id);
  dispatch(setCart(product, qt, type))
};

export const removePromotionFromCart = () => (dispatch) => {
  dispatch(getDiscountSuccess(null));
};

export const removeItemFromCart = (id) => (dispatch, getState) => {
  const items = getState().cartReducer.items.filter(
    (item) => item.id !== id
  );
  if (items.length === 0) {
    dispatch(clearCart());
  } else {
    dispatch(removeItem(items));
  }
};
export const getCartDiscount = () => async (dispatch, getState) => {
  const { selectedCustomer, paymentMethod } = getState().userReducer;
  const { totalAmount, items } = getState().cartReducer;
  const getCartDiscountPayload = setValidatePayload(
    selectedCustomer,
    totalAmount,
    items,
    paymentMethod
  );
  try {
    dispatch(getDiscountRequest());
    const promotion = await new Promise((resolve, reject) => {
      window.Voucherify.setIdentity(selectedCustomer.source_id);

      window.Voucherify.validate(getCartDiscountPayload, (response) => {
        if (response.valid) {
          resolve(response);
        } else {
          toast.error('No Cart Discount available');
          reject(new Error(response.reason));
        }
      });
    });
    console.log(promotion)
    const discount = promotion.promotions[0];

    dispatch(getDiscountSuccess(discount));
    toast.success(discount.banner);
  } catch (error) {
    console.log('[getCartDiscount]', error);
    dispatch(getDiscountError());
  }
};

export const getDiscount = (voucherCode) => async (dispatch, getState) => {
  const { selectedCustomer, paymentMethod } = getState().userReducer;
  const { totalAmount, items } = getState().cartReducer;
  const getDiscountPayload = setValidatePayload(
    selectedCustomer,
    totalAmount,
    items,
    paymentMethod
  );
  getDiscountPayload.code = voucherCode;
  try {
    dispatch(getDiscountRequest());
    const discount = await new Promise((resolve, reject) => {
      window.Voucherify.setIdentity(selectedCustomer.source_id);
      window.Voucherify.validate(getDiscountPayload, (response) => {
        if (response.valid) {
          resolve(response);
        } else {
          if (response.error) {
            toast.error(capitalize(response.error.message));
          } else {
            toast.error(capitalize(response.reason));
          }
          reject(new Error(response.reason));
        }
      });
    });
    dispatch(getDiscountSuccess(discount));
    dispatch(getTotals())
  } catch (error) {
    console.log('[getDiscount]', error);
    dispatch(getDiscountError());
  }
};

export const checkoutCart = () => async (dispatch, getState) => {
  const { selectedCustomer, paymentMethod } = getState().userReducer;
  const { totalAmount, items, discount } = getState().cartReducer;
  const checkoutPayload = setRedemptionPayload(
    selectedCustomer,
    totalAmount,
    items,
    paymentMethod
  );
  
  // If voucher or promotion is not applied
  if (_.isEmpty(discount)) {
    checkoutPayload.source_id = getOrderId();
    checkoutPayload.status = 'FULFILLED';

    await sendPayload(checkoutPayload, 'order')
      .then(() => {
        dispatch(clearCart());
        dispatch(setOrderId(checkoutPayload.source_id));
      })
      .catch((error) => {
        toast.error('There was a problem with your purchase');
        console.log('[checkoutCart]', error);
      });
    // If voucher is applied
  } else if (discount.hasOwnProperty('code')) {
    const discountCode = discount.code;
    checkoutPayload.code = discountCode;
    await sendPayload(checkoutPayload, 'redeem')
      .then((response) => {
        dispatch(clearCart());
        dispatch(setOrderId(response.order.id))
      })
      .catch((error) => {
        toast.error('There was a problem with your purchase');
        console.log('[checkoutCart][Discount]', error);
      });
    // If promotion is applied
  } else if (discount.hasOwnProperty('banner')) {
    const promotionId = discount.id;
    checkoutPayload.promotionId = promotionId;
    await sendPayload(checkoutPayload, 'redeem')
      .then((response) => {
        dispatch(clearCart());
        dispatch(setOrderId(response.order.id))
      })
      .catch((error) => {
        toast.error('There was a problem with your purchase');
        console.log('[checkoutCart][Cart Discount]', error);
      });
  }
};
