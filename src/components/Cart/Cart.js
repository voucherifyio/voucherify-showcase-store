import React from 'react';
import CartList from './CartList';
import CartCustomerAddress from './CartCustomerAddress';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Cart = ({ itemsTotalCount, selectedCustomer }) => {
  return (
    <div className="container">
      {itemsTotalCount > 0 ? (
        <>
          <div className="py-5 text-center">
            <h2>Checkout form</h2>
          </div>
          <div
            className="d-flex flex-lg-row flex-md-column
                  justify-content-center"
          >
            {selectedCustomer ? (
              <>
                <CartList />
                <CartCustomerAddress customer={selectedCustomer} />
              </>
            ) : (
              <Alert variant="dark">Select customer first!</Alert>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="py-5 text-center">
            <h2>Your cart is empty</h2>
          </div>
        </>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    itemsTotalCount: state.cartReducer.itemsTotalCount,
    selectedCustomer: state.userReducer.selectedCustomer,
  };
};

Cart.propTypes = {
  itemsTotalCount: PropTypes.number.isRequired,
  selectedCustomer: PropTypes.object,
};

export default connect(mapStateToProps)(Cart);
