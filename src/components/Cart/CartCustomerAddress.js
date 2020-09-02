import React from 'react';
import PropTypes from 'prop-types';

const CartCustomerAddress = ({ customer }) => {
  return (
    <div className="col-md-12 col-lg-3 order-1">
      <h4 className="mb-3">Address</h4>
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex flex-row justify-content-between lh-condensed">
          <div className="d-block justify-content-center col-12 text-truncate">
            {customer.name.split(' ')[0]} {customer.name.split(' ')[1]}{' '}
            {customer.email !== null && (
              <p className="mb-0 text-truncate">{customer.email}</p>
            )}
            <p className="mb-0 text-truncate">{customer.address.line_1}</p>
            <p className="mb-0 text-truncate">
              {customer.address.postal_code} {customer.address.city}
            </p>
            <p className="mb-0 text-truncate">
              {customer.address.state}, {customer.address.country}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CartCustomerAddress;

CartCustomerAddress.propTypes = {
  customer: PropTypes.object.isRequired,
};
