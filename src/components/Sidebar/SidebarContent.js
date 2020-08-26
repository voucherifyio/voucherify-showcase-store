import React, { useEffect, useState } from 'react';
import orderBy from 'lodash.orderby';
import SidebarCampaignDetails from './SidebarCampaignDetails';
import SidebarVoucherDetails from './SidebarVoucherDetails';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SidebarQualifications from './SidebarQualifications';
import { connect } from 'react-redux';
import { getCustomer } from '../../redux/actions/userActions';
import InfoIcon from '@material-ui/icons/Info';
import Switch from '@material-ui/core/Switch';
import {setEnableCartDiscounts} from '../../redux/actions/userActions'
import {
  getCartDiscount,
  removePromotionFromCart,
} from '../../redux/actions/cartActions';
import { isEmpty } from '../../redux/utils';

import PropTypes from 'prop-types';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    width: '100%',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(() => ({
  root: {
    padding: 20,
  },
}))(MuiAccordionDetails);

const SidebarContent = ({
  selectedCustomer,
  vouchers,
  campaigns,
  availableCustomers,
  fetchingCustomers,
  fetchingCoupons,
  dispatch,
  items,
  discount,
}) => {
  const [expanded, setExpanded] = useState('');
  const [activeCartDiscount, setActiveCartDiscount] = useState('');
  const [enableCartDiscounts, setEnableCartDiscountsState] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSwitchChange = (panel) => (event, newActiveCartDiscount) => {
    setActiveCartDiscount(newActiveCartDiscount ? panel : false);
  };

  const handleDiscountSwitchChange = () => {
    setEnableCartDiscountsState(!enableCartDiscounts)
  };

  useEffect(() => {
    dispatch(setEnableCartDiscounts(enableCartDiscounts));
  }, [dispatch, enableCartDiscounts])

  useEffect(() => {
    if (enableCartDiscounts && activeCartDiscount) {
      dispatch(getCartDiscount(activeCartDiscount));
    } else if (!enableCartDiscounts) {
      setActiveCartDiscount(false);
    } else if (!activeCartDiscount) {
      dispatch(removePromotionFromCart());
    }
  }, [dispatch, enableCartDiscounts, activeCartDiscount, items]);

  let customerDate = '';
  let downloadCustomerData = '';
  if (selectedCustomer) {
    customerDate = new Date(selectedCustomer.summary.orders.last_order_date);
    downloadCustomerData =
      'data: text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(selectedCustomer));
  }
  const discountVouchers = orderBy(vouchers, ['metadata']['demostoreOrder'], [
    'asc',
  ]);

  const discountCampaigns = orderBy(campaigns, ['metadata']['demostoreOrder'], [
    'asc',
  ]);

  const couponCampaigns = discountCampaigns.filter(
    (camp) => camp.campaign_type !== 'PROMOTION'
  );

  const cartDiscountCampaigns = discountCampaigns.filter(
    (camp) => camp.campaign_type === 'PROMOTION'
  );

  const cartDiscountToolTip =
    'The qualification endpoint returns all promotions available to the given customer profile and orders that meet predefined validation rules such as total order value or the minimum number of items in the cart.';

  return (
    <div className="list-group list-group-flush">
      <>
        {isEmpty(availableCustomers) || fetchingCustomers ? (
          <div className="d-flex my-3 justify-content-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <div className="storeSidebar-select-customer">
              <Form.Control
                as="select"
                id="storeCustomers"
                onChange={(e) => {
                  dispatch(getCustomer(e.target.value));
                }}
                value={(selectedCustomer || {}).source_id || 'DEFAULT'}
              >
                <option value="DEFAULT" disabled>
                  Select customer
                </option>
                {availableCustomers.map((customer) => (
                  <option key={customer.name} value={customer.source_id}>
                    {customer.name} ({customer.metadata.country})
                  </option>
                ))}
              </Form.Control>
              <a href={downloadCustomerData} download="customerData.json">
                <Tooltip title="Download data">
                  <IconButton>
                    <GetAppIcon />
                  </IconButton>
                </Tooltip>
              </a>
            </div>
            {!isEmpty(selectedCustomer) && (
              <>
                <div className="storeSidebar-content">
                  <p>
                    Location:{' '}
                    <span className="storeSidebar-content-data">
                      {selectedCustomer.address.country}
                    </span>
                  </p>
                  <p>
                    Total amount spent:{' '}
                    <span className="storeSidebar-content-data">
                      $
                      {(
                        selectedCustomer.summary.orders.total_amount / 100
                      ).toFixed(2)}
                    </span>
                  </p>
                  <p>
                    Last order date:{' '}
                    <span className="storeSidebar-content-data">
                      {('0' + customerDate.getDate()).slice(-2)}.
                      {('0' + (customerDate.getMonth() + 1)).slice(-2)}.
                      {customerDate.getFullYear()} @{' '}
                      {('0' + customerDate.getHours()).slice(-2)}:
                      {('0' + customerDate.getMinutes()).slice(-2)}
                    </span>
                  </p>
                </div>
              </>
            )}
          </>
        )}
        {!isEmpty(campaigns) &&
          !isEmpty(vouchers) &&
          !isEmpty(selectedCustomer) && (
            <>
              <SidebarQualifications key="qualifications" />
              <p className="storeSidebar-heading">
                Public Codes{' '}
                <span className="campaigns-count">({vouchers.length})</span>
              </p>
              {fetchingCoupons ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <div>
                  {discountVouchers.map((voucher) => (
                    <Accordion
                      square
                      key={voucher.metadata.demostoreName}
                      expanded={
                        expanded === `${voucher.metadata.demostoreName}`
                      }
                      onChange={handleChange(
                        `${voucher.metadata.demostoreName}`
                      )}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${voucher.metadata.demostoreName}-content`}
                        id={`${voucher.metadata.demostoreName}-header`}
                        className="campaign-box"
                      >
                        <p className="campaign-name">
                          {voucher.metadata.demostoreName}
                        </p>
                      </AccordionSummary>
                      <AccordionDetails className="bg-light">
                        <SidebarVoucherDetails
                          voucher={voucher}
                          code={voucher.code}
                        />
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              )}
              <p className="storeSidebar-heading">
                Personal Codes{' '}
                <span className="campaigns-count">
                  ({couponCampaigns.length})
                </span>
              </p>
              {fetchingCoupons ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <div>
                  {couponCampaigns.map((campaign) => (
                    <Accordion
                      square
                      key={campaign.name}
                      expanded={expanded === `${campaign.name}`}
                      onChange={handleChange(`${campaign.name}`)}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${campaign.metadata.demostoreName}-content`}
                        id={`${campaign.metadata.demostoreName}-header`}
                        className="campaign-box"
                      >
                        <p className="campaign-name">
                          {campaign.metadata.demostoreName}
                        </p>
                      </AccordionSummary>
                      <AccordionDetails className="bg-light">
                        <SidebarCampaignDetails
                          campaign={campaign}
                          code={
                            campaign.coupons.find(
                              (coupon) =>
                                coupon.selectedCustomer ===
                                selectedCustomer.source_id
                            ).customerDataCoupon
                          }
                        />
                      </AccordionDetails>
                    </Accordion>
                  ))}
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <p className="storeSidebar-heading">
                      Cart Discounts{' '}
                      <span className="campaigns-count">
                        ({cartDiscountCampaigns.length})
                      </span>
                    </p>
                    <Switch
                      color="default"
                      disabled={activeCartDiscount}
                      checked={enableCartDiscounts}
                      onChange={() => handleDiscountSwitchChange()}
                    />
                    <Tooltip title={cartDiscountToolTip}>
                      <InfoIcon className="mr-4" />
                    </Tooltip>
                  </div>
                  {cartDiscountCampaigns.map((campaign) => (
                    <Accordion
                      square
                      key={campaign.name}
                      expanded={expanded === `${campaign.name}`}
                      onChange={handleChange(`${campaign.name}`)}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls={`${campaign.metadata.demostoreName}-content`}
                        id={`${campaign.metadata.demostoreName}-header`}
                        className="campaign-box"
                      >
                        <div className="d-flex flex-row align-items-center">
                          <Switch
                            color="default"
                            disabled={!enableCartDiscounts}
                            checked={activeCartDiscount === `${campaign.name}`}
                            onClick={(event) => event.stopPropagation()}
                            onChange={handleSwitchChange(`${campaign.name}`)}
                          />
                          <p className="campaign-name">
                            {campaign.metadata.demostoreName}
                          </p>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails className="bg-light">
                        <SidebarCampaignDetails campaign={campaign} />
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              )}
            </>
          )}
      </>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedCustomer: state.userReducer.selectedCustomer,
    fetchingCoupons: state.userReducer.fetchingCoupons,
    vouchers: state.userReducer.vouchers,
    campaigns: state.userReducer.campaigns,
    availableCustomers: state.userReducer.availableCustomers,
    fetchingCustomers: state.userReducer.fetchingCustomers,
    items: state.cartReducer.items,
    discount: state.cartReducer.discount,
  };
};

export default connect(mapStateToProps)(SidebarContent);

SidebarContent.propTypes = {
  selectedCustomer: PropTypes.object,
  fetchingCoupons: PropTypes.bool,
  vouchers: PropTypes.object,
  discount: PropTypes.object,
};
