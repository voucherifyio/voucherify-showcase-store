import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from '../../redux/utils';
import NavigationMenu from './NavigationMenu';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './style.css';
import PropTypes from 'prop-types';

const Navigation = ({ vouchers }) => {
  const vouchersWithoutValidationRules = vouchers.filter(
    (voucher) => voucher.metadata.assigned_val_rules === ''
  );

  const ribbonVoucher =
    vouchersWithoutValidationRules[
      Math.floor(Math.random() * vouchersWithoutValidationRules.length)
    ];

  let ribbonDiscountText = '';
  let ribbonDiscountProduct = '';

  if (ribbonVoucher.discount.type === 'PERCENT') {
    ribbonDiscountText = `${ribbonVoucher.discount.percent_off}% off`;
  } else if (ribbonVoucher.discount.type === 'AMOUNT') {
    ribbonDiscountText = `$${(ribbonVoucher.discount.amount_off / 100).toFixed(
      2
    )} off`;
  }

  if (!isEmpty(ribbonVoucher.metadata.promotion_product)) {
    ribbonDiscountProduct = ` for ${ribbonVoucher.metadata.promotion_product}`;
  }
  return (
    <Row className="navigation">
      <Col xs={12}>
        <div className="navigationRibbon">
          Use code{' '}
          <span className="navigationRibbonCode">{ribbonVoucher.code}</span> to
          get {ribbonDiscountText}{' '}
          {ribbonDiscountProduct !== '' && { ribbonDiscountProduct }}
        </div>
      </Col>
      <Col md={5} className="navigationLogoWrapper">
        <Link to="/">
          <div className="navigationLogo">
            <img
              src="/logo.svg"
              alt="Hot Beans"
              className="navigationLogoImage"
            />
          </div>
        </Link>
      </Col>
      <NavigationMenu />
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    vouchers: state.userReducer.vouchers,
  };
};

export default connect(mapStateToProps)(Navigation);

Navigation.propTypes = {
  vouchers: PropTypes.array,
};
