import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearCart } from '../../redux/actions/cartActions';

const CartTotals = ({ totalAmountAfterDiscount, dispatch }) => {
  return (
    <li className="list-group-item d-flex flex-row justify-content-between lh-condensed">
      <Tooltip title="Clear cart">
        <IconButton className="mx-2" onClick={() => dispatch(clearCart())}>
          <ClearIcon />
        </IconButton>
      </Tooltip>
      <div
        className="d-flex flex-column justify-content-center
            my-auto ml-auto align-items-center col-4"
      >
        <h4 className="mb-0">${(totalAmountAfterDiscount / 100).toFixed(2)}</h4>
      </div>
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    totalAmountAfterDiscount: state.cartReducer.totalAmountAfterDiscount,
  };
};

export default connect(mapStateToProps)(CartTotals);

CartTotals.propTypes = {
  dispatch: PropTypes.func,
  totalAmountAfterDiscount: PropTypes.number,
};
