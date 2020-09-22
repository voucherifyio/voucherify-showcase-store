import React, { useEffect, useState } from 'react';
import _orderBy from 'lodash.orderby';
import SidebarCampaignDetails from './SidebarCampaignDetails';
import SidebarVoucherDetails from './SidebarVoucherDetails';
import Spinner from 'react-bootstrap/Spinner';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SidebarQualifications from './SidebarQualifications';
import { connect } from 'react-redux';
import InfoIcon from '@material-ui/icons/Info';
import Switch from '@material-ui/core/Switch';
import SidebarCustomer from './SidebarCustomer';
import {
  setEnableCartDiscounts,
  setCurrentCartDiscount,
} from '../../redux/actions/userActions';
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
  currentCustomer,
  vouchers,
  campaigns,
  availableCustomers,
  fetchingCustomers,
  fetchingCoupons,
  dispatch,
  items,
  currentCartDiscount,
  enableCartDiscounts,
}) => {
  const [expanded, setExpanded] = useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSwitchChange = (panel) => (event, newActiveCartDiscount) => {
    dispatch(setCurrentCartDiscount(newActiveCartDiscount ? panel : false));
  };

  const handleDiscountSwitchChange = () => {
    dispatch(setEnableCartDiscounts(!enableCartDiscounts));
  };

  useEffect(() => {
    if (enableCartDiscounts && currentCartDiscount) {
      dispatch(getCartDiscount(currentCartDiscount));
    } else if (!enableCartDiscounts) {
      dispatch(setCurrentCartDiscount(null));
    } else if (currentCartDiscount === false) {
      dispatch(removePromotionFromCart());
      dispatch(setCurrentCartDiscount(null));
    }
  }, [dispatch, currentCartDiscount, enableCartDiscounts, items]);

  const discountVouchers = _orderBy(vouchers, ['metadata']['demostoreOrder'], [
    'asc',
  ]);

  const discountCampaigns = _orderBy(
    campaigns,
    ['metadata']['demostoreOrder'],
    ['asc']
  );

  // We need to filter out Campaigns which does not have coupons avaliable.
  // This is the case for the Cart Discounts and for not yet active coupons
  const couponCampaigns = discountCampaigns.filter(
    (camp) => camp.campaign_type !== 'PROMOTION'
  );

  // We're creating separate filter only for Cart Discounts
  const cartDiscountCampaigns = discountCampaigns.filter(
    (camp) => camp.campaign_type === 'PROMOTION'
  );

  const cartDiscountToolTip =
    'The qualification endpoint returns all promotions available to the given customer profile and orders that meet predefined validation rules such as total order value or the minimum number of items in the cart.';

  // We're counting campaings for each Customer based on published coupons
  const countCampaings = () => {
    let campCount = 0;
    for (let i = 0; i < couponCampaigns.length; i++) {
      !isEmpty(
        couponCampaigns[i].coupons.find(
          (coupon) => coupon.currentCustomer === currentCustomer.source_id
        )
      ) && campCount++;
    }
    return campCount;
  };

  return (
    <div className="list-group list-group-flush">
      {!isEmpty(currentCustomer) && <SidebarCustomer />}
      {!isEmpty(campaigns) && !isEmpty(vouchers) && !isEmpty(currentCustomer) && (
        <>
          <SidebarQualifications key="qualifications" />
          <p className="storeSidebar-heading">
            Public Codes{' '}
            <span className="campaigns-count">({vouchers.length})</span>
          </p>
          {fetchingCoupons ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" size="sm" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div key="vouchers">
              {discountVouchers.map((voucher) => (
                <Accordion
                  square
                  key={voucher.metadata.demostoreName}
                  expanded={expanded === `${voucher.metadata.demostoreName}`}
                  onChange={handleChange(`${voucher.metadata.demostoreName}`)}
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
            <span className="campaigns-count">({countCampaings()})</span>
          </p>
          {fetchingCoupons ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" size="sm" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div>
              {couponCampaigns.map((campaign) => (
                // We're checking avaliable coupons for currentCustomer.
                <div key={campaign.name}>
                  {!isEmpty(
                    campaign.coupons.find(
                      (coupon) =>
                        coupon.currentCustomer === currentCustomer.source_id
                    )
                  ) && (
                    <Accordion
                      square
                      key={campaign.name}
                      expanded={expanded === campaign.name}
                      onChange={handleChange(campaign.name)}
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
                                coupon.currentCustomer ===
                                currentCustomer.source_id
                            ).customerDataCoupon
                          }
                        />
                      </AccordionDetails>
                    </Accordion>
                  )}
                </div>
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
                  disabled={currentCartDiscount}
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
                  expanded={expanded === campaign.name}
                  onChange={handleChange(campaign.name)}
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
                        checked={currentCartDiscount === campaign.name}
                        onClick={(event) => event.stopPropagation()}
                        onChange={handleSwitchChange(campaign.name)}
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentCustomer: state.userReducer.currentCustomer,
    fetchingCoupons: state.userReducer.fetchingCoupons,
    vouchers: state.userReducer.vouchers,
    campaigns: state.userReducer.campaigns,
    availableCustomers: state.userReducer.availableCustomers,
    fetchingCustomers: state.userReducer.fetchingCustomers,
    items: state.cartReducer.items,
    discount: state.cartReducer.discount,
    enableCartDiscounts: state.userReducer.enableCartDiscounts,
    currentCartDiscount: state.userReducer.currentCartDiscount,
  };
};

export default connect(mapStateToProps)(SidebarContent);

SidebarContent.propTypes = {
  currentCustomer: PropTypes.object,
  fetchingCoupons: PropTypes.bool,
  vouchers: PropTypes.array,
  discount: PropTypes.object,
  campaigns: PropTypes.array,
  availableCustomers: PropTypes.array,
  fetchingCustomers: PropTypes.bool,
  dispatch: PropTypes.func,
  items: PropTypes.array,
  currentCartDiscount: PropTypes.string,
  enableCartDiscounts: PropTypes.bool,
};
