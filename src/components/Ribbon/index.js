import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from '../../redux/utils';
import Row from 'react-bootstrap/Row';
import './style.css';
import PropTypes from 'prop-types';

const Ribbon = ({ navigationRibbonVoucher }) => {
  let ribbonDiscountText = '';
  let ribbonDiscountProduct = '';

  if (navigationRibbonVoucher.discount.type === 'PERCENT') {
    ribbonDiscountText = `${navigationRibbonVoucher.discount.percent_off}% off`;
  } else if (navigationRibbonVoucher.discount.type === 'AMOUNT') {
    ribbonDiscountText = `$${(
      navigationRibbonVoucher.discount.amount_off / 100
    ).toFixed(2)} off`;
  }

  if (!isEmpty(navigationRibbonVoucher.metadata.promotion_product)) {
    ribbonDiscountProduct = ` for ${navigationRibbonVoucher.metadata.promotion_product}`;
  }

  return (
    <Row noGutters={true} className="ribbonWrapper">
      <div className="ribbon">
        Use code{' '}
        <span
          className="ribbonCode"
          onClick={() =>
            navigator.clipboard.writeText(navigationRibbonVoucher.code)
          }
        >
          {navigationRibbonVoucher.code}
        </span>{' '}
        to get {ribbonDiscountText}{' '}
        {ribbonDiscountProduct !== '' && { ribbonDiscountProduct }}
      </div>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    navigationRibbonVoucher: state.userReducer.navigationRibbonVoucher,
  };
};

export default connect(mapStateToProps)(Ribbon);

Ribbon.propTypes = {
  navigationRibbonVoucher: PropTypes.object,
};
