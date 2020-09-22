import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from '../../redux/utils';

const SidebarCustomer = ({ currentCustomer }) => {
  let customerDate = '';
  if (currentCustomer) {
    customerDate = new Date(currentCustomer.summary.orders.last_order_date);
  }

  return (
    <>
      <div className="storeSidebar-content">
        <p>
          Customer:{' '}
          <span className="storeSidebar-content-data">
            {currentCustomer.name}
          </span>
        </p>
        <p>
          Location:{' '}
          <span className="storeSidebar-content-data">
            {currentCustomer.address.country}
          </span>
        </p>
        <p>
          Total amount spent:{' '}
          <span className="storeSidebar-content-data">
            ${(currentCustomer.summary.orders.total_amount / 100).toFixed(2)}
          </span>
        </p>
        <p>
          Last order date:{' '}
          <span className="storeSidebar-content-data">
            {('0' + customerDate.getDate()).slice(-2)}.
            {('0' + (customerDate.getMonth() + 1)).slice(-2)}.
            {customerDate.getFullYear()} @{' '}
            {('0' + customerDate.getHours()).slice(-2)}:
            {('0' + customerDate.getMinutes()).slice(-2)}
          </span>
        </p>
        <p>
          Email:{' '}
          <span className="storeSidebar-content-data">
            {!isEmpty(currentCustomer.metadata.demostoreFakeEmail)
              ? currentCustomer.metadata.demostoreFakeEmail
              : 'Not submitted'}
          </span>
        </p>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentCustomer: state.userReducer.currentCustomer,
  };
};

export default connect(mapStateToProps)(SidebarCustomer);

SidebarCustomer.propTypes = {
  currentCustomer: PropTypes.object,
};
