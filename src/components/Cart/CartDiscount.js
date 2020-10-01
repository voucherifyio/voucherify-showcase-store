import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentCartDiscount } from '../../redux/actions/userActions';
import { removePromotionFromCart } from '../../redux/actions/cartActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';

const CartDiscount = ({ dispatch, discount, discountedAmount }) => {
  return (
    <Row className="discountSection" noGutters={true}>
      {discount.hasOwnProperty('code') && (
        <Col xs={12} sm={4} className="sectionTitle">
          Discount code <span className="discounted">{discount.code}</span>
        </Col>
      )}
      {discount.hasOwnProperty('banner') && (
        <Col xs={12} sm={4} className="sectionTitle">
          Cart Discount <span className="discounted">{discount.name}</span>
        </Col>
      )}
      <Col xs={6} sm={7} className="discountAmount">
        <span className="discounted">
          ${(discountedAmount / 100).toFixed(2)}
        </span>
      </Col>
      {/* <Col xs={1} sm={1}></Col> */}
      <Col xs={6} sm={1} className="cartItemRemove">
        <Tooltip title="Remove promotion">
          <IconButton
            // edge="start"
            onClick={() => {
              dispatch(removePromotionFromCart());
              dispatch(setCurrentCartDiscount(null));
            }}
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    discount: state.cartReducer.discount,
    discountedAmount: state.cartReducer.discountedAmount,
  };
};

export default connect(mapStateToProps)(CartDiscount);

CartDiscount.propTypes = {
  dispatch: PropTypes.func,
  discount: PropTypes.object,
  discountedAmount: PropTypes.number,
};
