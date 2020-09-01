import {
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from '../constants';

const initialState = {
  products: [],
  fetchingProducts: false,
}

export const storeReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST: {
      return { 
        ...state,
        fetchingProducts: true
      };
    }
    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: action.payload.products,
        fetchingProducts: false,
      };
    }
    case GET_PRODUCTS_ERROR: {
      return { 
        ...state,
        fetchingProducts: false,
        fetchingProductsError: true
       };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default storeReducer;
