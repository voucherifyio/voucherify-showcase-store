import React, { useEffect, useState } from 'react';
import _orderBy from 'lodash.orderby';
import SidebarDiscountDetails from './SidebarDiscountDetails';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
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
import ShowMoreText from 'react-show-more-text';

const OrangeSwitch = withStyles({
  switchBase: {
    color: 'white',
    '&$checked': {
      color: 'var(--voucherify-orange)',
    },
    '&$checked + $track': {
      backgroundColor: 'var(--voucherify-orange)',
    },
  },
  checked: {},
  track: {},
})(Switch);

const SidebarCartDiscounts = ({
  currentCustomer,
  campaigns,
  fetchingCoupons,
  dispatch,
  items,
  currentCartDiscount,
  enableCartDiscounts,
}) => {
  const [expanded, setExpanded] = useState('');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : '');
  };

  const handleSwitchChange = (panel) => (event, newActiveCartDiscount) => {
    dispatch(setCurrentCartDiscount(newActiveCartDiscount ? panel : ''));
  };

  const handleDiscountSwitchChange = () => {
    dispatch(setEnableCartDiscounts(!enableCartDiscounts));
  };

  useEffect(() => {
    if (enableCartDiscounts && currentCartDiscount) {
      dispatch(getCartDiscount(currentCartDiscount));
    } else if (!enableCartDiscounts) {
      dispatch(setCurrentCartDiscount(''));
    } else if (currentCartDiscount === '') {
      dispatch(removePromotionFromCart());
      dispatch(setCurrentCartDiscount(''));
    }
  }, [dispatch, currentCartDiscount, enableCartDiscounts, items]);

  const discountCampaigns = _orderBy(campaigns, ['metadata']['order'], ['asc']);

  // We're creating separate filter only for Cart Discounts
  const cartDiscountCampaigns = discountCampaigns.filter(
    (camp) => camp.campaign_type === 'PROMOTION'
  );
  // We're counting campaings for each Customer based on published coupons

  return (
    <div className="accordions">
      {!isEmpty(campaigns) && !isEmpty(currentCustomer) && (
        <>
          <div className="sidebarSectionHeading accordionSection">
            <div className="cartDiscountsTitle">
              {' '}
              <span className="sidebarSectionTitle">
                Cart discounts ({cartDiscountCampaigns.length})
              </span>
            </div>

            <div className="cartDiscountDescription">
              <ShowMoreText anchorClass="readMore" lines={2}>
                <p>
                  The qualification endpoint returns all promotions available to
                  the given customer profile and orders that meet predefined
                  validation rules such as total order value or the minimum
                  number of items in the cart.
                </p>
              </ShowMoreText>
            </div>
          </div>

          {fetchingCoupons ? (
            <div className="sidebarSpinner">
              <Spinner animation="border" size="sm" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div>
              <div className="cartDiscountSwitch">
                <OrangeSwitch
                  color="default"
                  disabled={currentCartDiscount ? true : false}
                  checked={enableCartDiscounts}
                  onChange={() => handleDiscountSwitchChange()}
                />
                Enable Cart Discounts
              </div>
              {cartDiscountCampaigns.map((campaign) => (
                <Accordion
                  square
                  key={campaign.id}
                  expanded={expanded === campaign.id}
                  onChange={handleChange(campaign.id)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls={campaign.id}
                    id={campaign.id}
                  >
                    <div className="cartDiscountCampaignSwitch">
                      <OrangeSwitch
                        color="default"
                        disabled={!enableCartDiscounts}
                        checked={
                          currentCartDiscount === campaign.name ? true : false
                        }
                        onClick={(event) => event.stopPropagation()}
                        onChange={handleSwitchChange(campaign.name)}
                      />
                      <p className="accordionTitle">{campaign.name}</p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <SidebarDiscountDetails campaign={campaign} />
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

export default connect(mapStateToProps)(SidebarCartDiscounts);

SidebarCartDiscounts.propTypes = {
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
