import {
  INIT_REQUEST,
  INIT_SUCCESS,
  INIT_ERROR,
  GET_CUSTOMERS_ERROR,
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMER_SUCCESS,
  GET_CAMPAIGNS_ERROR,
  GET_CAMPAIGNS_REQUEST,
  GET_CAMPAIGNS_SUCCESS,
  GET_VOUCHERS_REQUEST,
  GET_VOUCHERS_ERROR,
  GET_VOUCHERS_SUCCESS,
  GET_CUSTOMER_ERROR,
  GET_CUSTOMER_REQUEST,
  GET_QUALIFICATIONS_REQUEST,
  GET_QUALIFICATIONS_SUCCESS,
  GET_QUALIFICATIONS_ERROR,
  SET_PAYMENT_METHOD,
  SET_ENABLE_CART_DISCOUNTS,
} from '../constants';

export const userReducer = (
  initialState = {
    selectedCustomer: null,
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
  },
  action
) => {
  switch (action.type) {
    case INIT_REQUEST: {
      return {
        ...initialState,
        fetchingSessionId: true,
      };
    }
    case SET_ENABLE_CART_DISCOUNTS: {
      return {
        ...initialState,
        enableCartDiscounts: action.payload.enableCartDiscounts
      }
    }
    case INIT_SUCCESS: {
      return {
        ...initialState,
        sessionId: action.payload.sessionId,
        publishedCodes: action.payload.publishedCodes,
        fetchingSessionId: false,
        fetchingSessionIdError: false,
      };
    }
    case INIT_ERROR: {
      return {
        ...initialState,
        fetchingSessionId: false,
        fetchingSessionIdError: true,
      };
    }
    case GET_CUSTOMERS_REQUEST: {
      return {
        ...initialState,
        fetchingCustomers: true,
      };
    }
    case GET_CUSTOMERS_SUCCESS: {
      return {
        ...initialState,
        availableCustomers: action.payload.availableCustomers,
        fetchingCustomers: false,
        fetchingCustomersError: false,
      };
    }
    case GET_CUSTOMERS_ERROR: {
      return {
        ...initialState,
        fetchingCustomersError: true,
      };
    }
    case GET_CAMPAIGNS_REQUEST: {
      return {
        ...initialState,
        fetchingCoupons: true,
      };
    }
    case GET_CAMPAIGNS_SUCCESS: {
      return {
        ...initialState,
        campaigns: action.payload.campaigns,
      };
    }
    case GET_CAMPAIGNS_ERROR: {
      return {
        ...initialState,
        fetchingCampaignsError: true,
      };
    }

    case GET_VOUCHERS_REQUEST: {
      return {
        ...initialState,
      };
    }
    case GET_VOUCHERS_SUCCESS: {
      return {
        ...initialState,
        vouchers: action.payload.vouchers,
        fetchingCoupons: false,
      };
    }
    case GET_VOUCHERS_ERROR: {
      return {
        ...initialState,
        fetchingVouchersError: true,
      };
    }
    case GET_CUSTOMER_REQUEST: {
      return {
        ...initialState,
        fetchingCustomer: true,
      }
    }
    case GET_CUSTOMER_SUCCESS: {
      return {
        ...initialState,
        selectedCustomer: action.payload.selectedCustomer,
        fetchingCustomer: false,
      }
    }
    case GET_CUSTOMER_ERROR: {
      return {
        ...initialState,
        fetchingCustomerError: true,
      }
    }
    case GET_QUALIFICATIONS_REQUEST: {
      return {
        ...initialState,
        fetchingQualifications: true,
      }
    }
    case GET_QUALIFICATIONS_SUCCESS: {
      return {
        ...initialState,
        fetchingQualifications: false,
        qualifications: action.payload.qualifications,
      }
    }
    case GET_QUALIFICATIONS_ERROR: {
      return {
        ...initialState,
        fetchingQualificationsError: true,
      }
    }
    case SET_PAYMENT_METHOD: {
      return {
        ...initialState,
        paymentMethod: action.payload.paymentMethod
      }
    }
    default: {
      return {
        ...initialState,
      };
    }
  }
};

export default userReducer;
