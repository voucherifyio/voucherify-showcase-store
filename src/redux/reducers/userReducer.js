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
} from '../constants';

const initialState = {
  currentCustomer: null,
  availableCustomers: null,
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
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
      const newPublishedCodes = state.publishedCodes;
      const customerIndex = newPublishedCodes.findIndex(
        (customer) =>
          customer.currentCustomer === action.payload.currentCustomer
      );
      newPublishedCodes[customerIndex].campaigns.push(action.payload.campaign);
      return {
        ...state,
        publishedCodes: newPublishedCodes,
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
        availableCustomers: action.payload.availableCustomers,
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
      return {
        ...state,
        campaigns: action.payload.campaigns,
        fetchingCoupons: false,
      };
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
      return {
        ...state,
        currentCustomer: action.payload.currentCustomer,
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
