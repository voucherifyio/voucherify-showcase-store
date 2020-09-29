import React, { useState } from 'react';
import _orderBy from 'lodash.orderby';
import SidebarDiscountDetails from './SidebarDiscountDetails';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { isEmpty } from '../../redux/utils';
import PropTypes from 'prop-types';

const SidebarPublicDiscounts = ({
  currentCustomer,
  vouchers,
  fetchingCoupons,
}) => {
  const [expanded, setExpanded] = useState('');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const discountVouchers = _orderBy(vouchers, ['metadata']['order'], ['asc']);

  return (
    <div>
      {!isEmpty(vouchers) && !isEmpty(currentCustomer) && (
        <>
          <div className="sidebarSectionHeading accordionSection">
            <span className="sidebarSectionTitle">
              Public Codes ({vouchers.length})
            </span>
          </div>

          {fetchingCoupons ? (
            <div className="sidebarSpinner">
              <Spinner animation="border" size="sm" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div>
              {discountVouchers.map((voucher) => (
                <Accordion
                  square
                  key={voucher.id}
                  expanded={expanded === voucher.id}
                  onChange={handleChange(voucher.id)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={voucher.id}
                    id={voucher.id}
                  >
                    <p className="accordionTitle">{voucher.metadata.name}</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <SidebarDiscountDetails
                      campaign={voucher}
                      code={voucher.code}
                    />
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

export default connect(mapStateToProps)(SidebarPublicDiscounts);

SidebarPublicDiscounts.propTypes = {
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
