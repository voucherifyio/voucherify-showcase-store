import {
  GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR
} from '../constants'

export const getProductsRequest = () => {
  return { type: GET_PRODUCTS_REQUEST };
};
export const getProductsSuccess = (products) => {
  return { type: GET_PRODUCTS_SUCCESS, payload: { products } };
};

export const getProductsError = () => {
    return { type: GET_PRODUCTS_ERROR };
  };

export const getProducts = () => async (dispatch) => {
  dispatch(getProductsRequest());
  fetch(`${process.env.REACT_APP_API_URL || ''}/products`, {
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((products) => {
      dispatch(getProductsSuccess(products));
    })
    .catch((error) => {
      console.log('[getProducts][Error]',error)
      dispatch(getProductsError());
    });
};
