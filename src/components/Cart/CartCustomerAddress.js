import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';

const CartCustomerAddress = ({ currentCustomer }) => {
  return (
    <Col lg={3}>
      <h4 className="cartCustomerAddressTitle">Address</h4>
      <div className="cartCustomerAddress">
        <p className="cartCustomerAddressName">{currentCustomer.name}</p>
        {currentCustomer.email !== null && <p>{currentCustomer.email}</p>}
        <p>{currentCustomer.address.line_1}</p>
        <p>
          {currentCustomer.address.postal_code} {currentCustomer.address.city}
        </p>
        <p>
          {currentCustomer.address.state}, {currentCustomer.address.country}
        </p>
      </div>
    </Col>
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
