import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import { setPaymentMethod } from '../../redux/actions/cartActions';

const PaymentMethod = ({ paymentMethod, dispatch}) => {
  const paymentMethods = ['Visa', 'MasterCard', 'Other'];

  return (
    <li className="list-group-item d-flex lh-condensed">
      <div className="my-auto col-4">
        Payment method: <strong>{paymentMethod}</strong>
      </div>
      <div className="d-flex my-auto col-4">
        {paymentMethods.map((paymentMethod) => (
          <Chip
            key={paymentMethod}
            className="mr-1"
            onClick={() => dispatch(setPaymentMethod(paymentMethod))}
            label={paymentMethod}
          />
        ))}
      </div>
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    paymentMethod: state.userReducer.paymentMethod,
  };
};

export default connect(mapStateToProps)(PaymentMethod);

PaymentMethod.propTypes = {
  dispatch: PropTypes.func,
};
