import { toast } from 'react-toastify';
import {
  setRedemptionPayload,
  setOrderPayload,
  setValidatePayload,
  getOrderId,
  sendPayload,
} from '../utils';
import _cloneDeep from 'lodash.clonedeep';
import { isEmpty } from '../utils';

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

export const getDiscountRequest = () => {
  return { type: GET_DISCOUNT_REQUEST };
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
  const { currentCustomer } = getState().userReducer;
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

      window.Voucherify.validate(getCartDiscountPayload, (res) => {
        const discount = res.promotions.filter(
          (promo) => promo.metadata.demostoreName === activeCartDiscount
        )[0];
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
      toast.success(promotion.banner);
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
  const {
    totalAmount,
    items,
    paymentMethod,
    discount,
  } = getState().cartReducer;
  const getDiscountPayload = setValidatePayload(
    currentCustomer,
    totalAmount,
    items,
    paymentMethod
  );
  getDiscountPayload.code = voucherCode;
  const currentDiscount = discount;
  try {
    dispatch(getDiscountRequest());
    let discount = await new Promise((resolve, reject) => {
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
    if (isEmpty(currentDiscount)) {
      dispatch(getDiscountSuccess(discount));
    } else {
      discount = currentDiscount;
      dispatch(getDiscountSuccess(discount));
    }
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
    if (isEmpty(discount)) {
      const checkoutPayload = setOrderPayload(
        currentCustomer,
        totalAmount,
        items,
        paymentMethod
      );
      checkoutPayload.source_id = getOrderId();
      checkoutPayload.status = 'FULFILLED';
      await sendPayload(checkoutPayload, 'order');
      dispatch(clearCart());
      dispatch(setOrderId(checkoutPayload.source_id));
    } else {
      const checkoutPayload = setRedemptionPayload(
        currentCustomer,
        totalAmount,
        items,
        paymentMethod
      );
      if (discount.hasOwnProperty('code')) {
        // If voucher is applied
        const discountCode = discount.code;
        checkoutPayload.code = discountCode;
        const res = await sendPayload(checkoutPayload, 'redeem');
        dispatch(clearCart());
        dispatch(setOrderId(res.id));
      } else if (discount.hasOwnProperty('banner')) {
        // If promotion is applied
        const promotionId = discount.id;
        checkoutPayload.promotionId = promotionId;
        const res = await sendPayload(checkoutPayload, 'redeem');
        dispatch(clearCart());
        dispatch(setOrderId(res.order.id));
      }
    }
  } catch (error) {
    toast.error('There was a problem with your purchase');
    console.log('[checkoutCart]', error);
  }
};
