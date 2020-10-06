import React, { useState } from 'react';
import _orderBy from 'lodash.orderby';
import _isEmpty from 'lodash.isempty';
import SidebarDiscountDetails from './SidebarDiscountDetails';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SidebarQualifications from './SidebarQualifications';
import { connect } from 'react-redux';
import SidebarCustomer from './SidebarCustomer';
import PropTypes from 'prop-types';

const SidebarPersonalDiscounts = ({
  currentCustomer,
  campaigns,
  fetchingCoupons,
}) => {
  const [expanded, setExpanded] = useState('');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const discountCampaigns = _orderBy(campaigns, ['metadata']['order'], ['asc']);

  // We need to filter out Campaigns which does not have coupons avaliable.
  // This is the case for the Cart Discounts and for not yet active coupons
  const couponCampaigns = discountCampaigns.filter(
    (camp) => camp.campaign_type !== 'PROMOTION'
  );

  // We're counting campaings for each Customer based on published coupons
  const countCampaings = () => {
    let campCount = 0;
    for (let i = 0; i < couponCampaigns.length; i++) {
      !_isEmpty(
        couponCampaigns[i].coupons.find(
          (coupon) => coupon.currentCustomer === currentCustomer.source_id
        )
      ) && campCount++;
    }
    return campCount;
  };

  return (
    <div>
      {!_isEmpty(currentCustomer) && <SidebarCustomer />}
      {!_isEmpty(campaigns) && !_isEmpty(currentCustomer) && (
        <>
          <SidebarQualifications />
          <div className="sidebarSectionHeading accordionSection">
            <span className="sidebarSectionTitle">
              Personal Codes ({countCampaings()})
            </span>
          </div>

          {fetchingCoupons ? (
            <div className="sidebarSpinner">
              <Spinner animation="border" size="sm" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="accordions">
              {couponCampaigns.map((campaign) => (
                // We're checking avaliable coupons for currentCustomer.
                <div key={campaign.name}>
                  {!_isEmpty(
                    campaign.coupons.find(
                      (coupon) =>
                        coupon.currentCustomer === currentCustomer.source_id
                    )
                  ) && (
                    <Accordion
                      square
                      key={campaign.id}
                      expanded={expanded === campaign.id}
                      onChange={handleChange(campaign.id)}
                      className={
                        expanded === campaign.id
                          ? 'accordionBackground open'
                          : 'accordionBackground'
                      }
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={campaign.id}
                        id={campaign.id}
                      >
                        <p className="accordionTitle">{campaign.name}</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <SidebarDiscountDetails
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
  };
};

export default connect(mapStateToProps)(SidebarPersonalDiscounts);

SidebarPersonalDiscounts.propTypes = {
  currentCustomer: PropTypes.object,
  fetchingCoupons: PropTypes.bool,
  vouchers: PropTypes.array,
  discount: PropTypes.object,
  campaigns: PropTypes.array,
  availableCustomers: PropTypes.array,
  fetchingCustomers: PropTypes.bool,
  dispatch: PropTypes.func,
  items: PropTypes.array,
};
