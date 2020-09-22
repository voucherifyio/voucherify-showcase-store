import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentCartDiscount } from '../../redux/actions/userActions';
import { removePromotionFromCart } from '../../redux/actions/cartActions';

const ValidatedDiscount = ({ dispatch, discount, discountedAmount }) => {
  return (
    <li className="list-group-item d-flex flex-row justify-content-between lh-condensed">
      {discount.hasOwnProperty('code') && (
        <>
          <div className="d-inline my-auto col-4">
            Discount code <span className="text-success">{discount.code}</span>
          </div>
        </>
      )}
      {discount.hasOwnProperty('banner') && (
        <>
          <div className="d-inline my-auto col-4">
            Cart Discount{' '}
            <span className="text-success">
              {discount.metadata.demostoreName}
            </span>
          </div>
        </>
      )}
      <div className="d-none d-lg-block my-auto mx-auto col-4"></div>
      <div
        className="d-flex flex-column justify-content-center
      my-auto mx-auto align-items-center col-2"
      >
        <small className="text-success">Discount</small>
        <span className="text-success">
          -${(discountedAmount / 100).toFixed(2)}
        </span>
      </div>
      <div className="d-flex flex-column justify-content-center">
        <IconButton
          className="mx-2"
          onClick={() => {
            dispatch(removePromotionFromCart());
            dispatch(setCurrentCartDiscount(null));
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    discount: state.cartReducer.discount,
    discountedAmount: state.cartReducer.discountedAmount,
  };
};

export default connect(mapStateToProps)(ValidatedDiscount);

ValidatedDiscount.propTypes = {
  dispatch: PropTypes.func,
  discount: PropTypes.object,
  discountedAmount: PropTypes.number,
};
