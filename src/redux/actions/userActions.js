import { loadState } from '../localStorage';
import _ from 'lodash';
import { setValidatePayload } from '../utils';
import {
  INIT_REQUEST,
  INIT_SUCCESS,
  INIT_ERROR,
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_ERROR,
  GET_QUALIFICATIONS_REQUEST,
  GET_QUALIFICATIONS_SUCCESS,
  GET_QUALIFICATIONS_ERROR,
  GET_CAMPAIGNS_REQUEST,
  GET_CAMPAIGNS_SUCCESS,
  GET_CAMPAIGNS_ERROR,
  GET_VOUCHERS_REQUEST,
  GET_VOUCHERS_SUCCESS,
  GET_VOUCHERS_ERROR,
  GET_CUSTOMER_REQUEST,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_ERROR,
  SET_ENABLE_CART_DISCOUNTS
} from '../constants';

export const initRequest = () => {
  return { type: INIT_REQUEST };
};
export const initSuccess = ({ sessionId, publishedCodes }) => {
  return { type: INIT_SUCCESS, payload: { sessionId, publishedCodes } };
};

export const initError = () => {
  return { type: INIT_ERROR };
};

export const getCustomersRequest = () => {
  return { type: GET_CUSTOMERS_REQUEST };
};
export const getCustomersSuccess = ({ availableCustomers }) => {
  return { type: GET_CUSTOMERS_SUCCESS, payload: { availableCustomers } };
};

export const getCustomersError = () => {
  return { type: GET_CUSTOMERS_ERROR };
};

export const getQualificationsRequest = () => {
  return { type: GET_QUALIFICATIONS_REQUEST };
};
export const getQualificationsSuccess = (qualifications) => {
  return { type: GET_QUALIFICATIONS_SUCCESS, payload: { qualifications } };
};

export const setEnableCartDiscounts = (enableCartDiscounts) => {
  return {type: SET_ENABLE_CART_DISCOUNTS, payload: {enableCartDiscounts}}
}
export const getQualificationsError = () => {
  return { type: GET_QUALIFICATIONS_ERROR };
};

export const getCampaignsRequest = () => {
  return { type: GET_CAMPAIGNS_REQUEST };
};

export const getCampaignsSuccess = (campaigns) => {
  return { type: GET_CAMPAIGNS_SUCCESS, payload: { campaigns } };
};

export const getCampaignsError = () => {
  return { type: GET_CAMPAIGNS_ERROR };
};

export const getVouchersRequest = () => {
  return { type: GET_VOUCHERS_REQUEST };
};

export const getVouchersSuccess = (vouchers) => {
  return { type: GET_VOUCHERS_SUCCESS, payload: { vouchers } };
};

export const getVouchersError = () => {
  return { type: GET_VOUCHERS_ERROR };
};

export const getCustomerRequest = () => {
  return { type: GET_CUSTOMER_REQUEST };
};

export const getCustomerSuccess = (selectedCustomer) => {
  return { type: GET_CUSTOMER_SUCCESS, payload: { selectedCustomer } };
};

export const getCustomerError = () => {
  return { type: GET_CUSTOMER_ERROR };
};

export const init = () => async (dispatch) => {
  dispatch(initRequest());
  await fetch(`${process.env.REACT_APP_API_URL || ''}/init`, {
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((resp) => {
      if (resp.coupons.length === 0) {
        dispatch(
          initSuccess({
            sessionId: resp.session,
            publishedCodes: loadState().userReducer.publishedCodes,
          })
        );
      } else {
        dispatch(
          initSuccess({
            sessionId: resp.session,
            publishedCodes: resp.coupons,
          })
        );
      }
    })
    .then(() => dispatch(getCustomers()))
    .then(() => dispatch(getCampaigns()))
    .then(() => dispatch(getVouchers()))
    .catch((error) => {
      console.log('[Init][Error]', error);
      dispatch(initError());
    });
};

export const getCustomers = () => async (dispatch, getState) => {
  const { sessionId, selectedCustomer } = getState().userReducer;
  dispatch(getCustomersRequest());
  await fetch(`${process.env.REACT_APP_API_URL || ''}/customers/${sessionId}`, {
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((availableCustomers) => {
      dispatch(getCustomersSuccess({ availableCustomers }));

      if (
        !_.map(availableCustomers, 'source_id', []).includes(
          _.get(selectedCustomer, 'source_id')
        )
      ) {
        dispatch(getCustomerSuccess(null));
      }
    })
    .catch((error) => {
      console.log('[getCustomers][Error]', error);
      dispatch(getCustomersError());
    });
};

export const getCampaigns = () => async (dispatch, getState) => {
  const { publishedCodes } = getState().userReducer;
  dispatch(getCampaignsRequest());
  try {
    const campaings = await fetch(
      `${process.env.REACT_APP_API_URL || ''}/campaigns`,
      {
        credentials: 'include',
      }
    ).then((response) => response.json());

    campaings.forEach(async (camps) => {
      camps.coupons = [];
      publishedCodes.forEach((code) => {
        code.campaigns.forEach((camp) => {
          if (camp.campaign === camps.name) {
            camps.coupons.push({
              selectedCustomer: code.selectedCustomer,
              customerDataCoupon: camp.code,
            });
          }
        });
      });
      if (camps.campaign_type === 'PROMOTION') {
        await fetch(
          `${process.env.REACT_APP_API_URL || ''}/promotions/${camps.id}`,
          {
            include: 'credentials',
          }
        )
          .then((promos) => promos.json())
          .then((campaignPromotionTiers) => {
            camps.tiers = campaignPromotionTiers.tiers;
          });
      }
    });
    dispatch(getCampaignsSuccess(campaings));
  } catch (error) {
    console.log('[getCampaigns][Error]', error);
    dispatch(getCampaignsError());
  }
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getVouchers = () => async (dispatch) => {
  dispatch(getVouchersRequest());
  await fetch(`${process.env.REACT_APP_API_URL || ''}/vouchers`, {
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((vouchers) => {
      dispatch(getVouchersSuccess(vouchers));
    })
    .catch((error) => {
      console.log('[getVouchers][Error]', error);
      dispatch(getVouchersError());
    });
};

export const getCustomer = (id, type = 'normal') => async (
  dispatch,
  getState
) => {
  dispatch(getCustomerRequest());
  try {
    const selectedCustomer = await fetch(
      `${process.env.REACT_APP_API_URL || ''}/customer/${id}`,
      {
        credentials: 'include',
      }
    ).then((response) => response.json());
    if (type === 'normal') {
      dispatch(getCustomerSuccess(selectedCustomer));
    } else {
      const oldSelectedCustomer = getState().userReducer.selectedCustomer;
      if (
        oldSelectedCustomer.summary.orders.total_amount ===
        selectedCustomer.summary.orders.total_amount
      ) {
        // If true -> wait
        sleep(5000).then(() => dispatch(getCustomer(id, 'update')));
      } else {
        dispatch(getCustomer(id))
          .then(() => dispatch(getCampaigns))
          .then(() => dispatch(getVouchers));
      }
    }
  } catch (error) {
    if (type === 'normal') {
      console.log('[getCustomer][Error]', error);
    } else {
      console.log('[getCustomer][Update][Error]', error);
    }
    dispatch(getCustomerError());
  }
};

export const getQualifications = () => async (dispatch, getState) => {
  const { selectedCustomer, paymentMethod } = getState().userReducer;
  const { totalAmount, items } = getState().cartReducer;
  const qualificationsPayload = setValidatePayload(
    selectedCustomer,
    totalAmount,
    items,
    paymentMethod
  );

  dispatch(getQualificationsRequest());

  await fetch(`${process.env.REACT_APP_API_URL || ''}/qualifications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(qualificationsPayload),
  })
    .then((resp) => resp.json())
    .then((qualifications) => {
      dispatch(getQualificationsSuccess(qualifications));
    })
    .catch((error) => {
      console.log('[getQualifications][Error]', error);
      dispatch(getQualificationsError);
    });
};
