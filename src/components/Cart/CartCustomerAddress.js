import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CartCustomerAddress = ({ currentCustomer }) => {
  return (
    <div className="col-md-12 col-lg-3 order-1">
      <h4 className="mb-3">Address</h4>
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex flex-row justify-content-between lh-condensed">
          <div className="d-block justify-content-center col-12 text-truncate">
            {currentCustomer.name.split(' ')[0]}{' '}
            {currentCustomer.name.split(' ')[1]}{' '}
            {currentCustomer.email !== null && (
              <p className="mb-0 text-truncate">{currentCustomer.email}</p>
            )}
            <p className="mb-0 text-truncate">
              {currentCustomer.address.line_1}
            </p>
            <p className="mb-0 text-truncate">
              {currentCustomer.address.postal_code}{' '}
              {currentCustomer.address.city}
            </p>
            <p className="mb-0 text-truncate">
              {currentCustomer.address.state}, {currentCustomer.address.country}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentCustomer: state.userReducer.currentCustomer,
  };
};

export default connect(mapStateToProps)(CartCustomerAddress);

CartCustomerAddress.propTypes = {
  currentCustomer: PropTypes.object.isRequired,
};
