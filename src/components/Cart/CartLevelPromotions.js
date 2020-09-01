import React from 'react';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { getCartDiscount } from '../../redux/actions/cartActions';
import { connect } from 'react-redux';

const CartLevelPromotions = ({ dispatch }) => {
  return (
    <li className="list-group-item d-flex flex-row lh-condensed">
      <Chip
        label="Get Cart Discount"
        style={{
          backgroundColor: '#ff8b5c',
          color: 'white',
          maxWidth: '100%',
        }}
        className="mr-1"
        onClick={() => {
          dispatch(getCartDiscount());
        }}
      />
    </li>
  );
};

export default connect()(CartLevelPromotions);

CartLevelPromotions.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
