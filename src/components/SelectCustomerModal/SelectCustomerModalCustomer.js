import React from 'react';
import { getCurrentCustomer } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SelectCustomerModalCustomer = ({
  customer,
  dispatch,
}) => {
  const handleSelectCustomer = (customer) => {
    dispatch(getCurrentCustomer(customer.source_id));
  };
  return (
    <div className="d-flex flex-column flex-basis-100 p-5 customer-card" onClick={() => handleSelectCustomer(customer)}>
      <div className="mx-auto">
        <img
          alt="temporary avatar"
          src={customer.metadata.customerAvatar}
          width={100}
        ></img>
      </div>
      <div className="d-flex my-3 flex-column align-items-center justify-content-center">
        <h2 className="customerModal-customerTitle">
          {customer.metadata.customerTitle}
        </h2>
        <p className="customerModal-customerDescription">
          {customer.metadata.customerDescription}
        </p>
      </div>
    </div>
  );
};

export default connect()(SelectCustomerModalCustomer);

SelectCustomerModalCustomer.propTypes = {
  dispatch: PropTypes.func,
  customer: PropTypes.object,
};
