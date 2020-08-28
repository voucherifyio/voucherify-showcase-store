import React from 'react';
import CartList from './CartList';
import CartCustomerAddress from './CartCustomerAddress';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Cart = ({ itemsTotalCount, currentCustomer }) => {
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
            {currentCustomer ? (
              <>
                <CartList />
                <CartCustomerAddress customer={currentCustomer} />
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
    currentCustomer: state.userReducer.currentCustomer,
  };
};

Cart.propTypes = {
  itemsTotalCount: PropTypes.number.isRequired,
  currentCustomer: PropTypes.object,
};

export default connect(mapStateToProps)(Cart);
