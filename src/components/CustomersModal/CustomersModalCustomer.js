import React from 'react';
import { getCurrentCustomer } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArrowIcon from '../../assets/ArrowIcon.png';

const CustomersModalCustomer = ({ customer, dispatch }) => {
  const handleSelectCustomer = (customer) => {
    dispatch(getCurrentCustomer(customer.source_id));
  };

  return (
    <div
      className="customersModalCustomer"
      onClick={() => handleSelectCustomer(customer)}
    >
      <div className="customersModalCustomerImgWrapper">
        <img
          alt="Customer Avatar"
          src={customer.metadata.avatar}
          className="customersModalCustomerImg"
        ></img>
      </div>
      <div className="customersModalCustomerDescWrapper">
        <h2 className="customersModalCustomerTitle">
          {customer.metadata.title}
        </h2>
        <p className="customersModalCustomerDesc">
          {customer.metadata.description}
        </p>
      </div>
      <div className="customersModalArrowLink">
        <img className="customersModalArrow" alt="" src={ArrowIcon} />
        <div className="customersModalLink">
          Login as {customer.metadata.firstName}
        </div>
      </div>
    </div>
  );
};

export default connect()(CustomersModalCustomer);

CustomersModalCustomer.propTypes = {
  dispatch: PropTypes.func,
  customer: PropTypes.object,
};
