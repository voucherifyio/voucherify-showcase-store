import React from 'react';
import CartItem from './CartItem';
import _ from 'lodash';
import CartForm from './CartForm';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const CartList = ({value, customerValue}) => {
  const {
    cart,
    appliedVoucher,
    discountedAmount,
    removePromotionFromCart,
    cartTotalAfterPromotion,
    clearCart,
  } = value;
  return (
    <div className="col-md-12 col-lg-9 order-2">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span>Your cart</span>
      </h4>
      <ul className="list-group mb-3">
        {cart.map((item) => {
          return <CartItem key={item.id} item={item} value={value} />;
        })}
        {!_.isEmpty(value.appliedVoucher) ? (
          <li className="list-group-item d-flex flex-row justify-content-between lh-condensed">
            <div className="d-inline my-auto col-4">
              Discount code{' '}
              <span className="text-success">{appliedVoucher.code}</span>
            </div>
            <div className="d-none d-lg-block my-auto mx-auto col-2"></div>
            <div className="d-none d-lg-block my-auto mx-auto col-2"></div>
            <div className="d-flex flex-column justify-content-center
              my-auto mx-auto align-items-center col-2">
              <small className="text-success">Discount</small>
              <span className="text-success">
                -${(discountedAmount / 100).toFixed(2)}
              </span>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <IconButton
                className="mx-2"
                onClick={() => removePromotionFromCart()}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </li>
        ) : (
          <CartForm value={value} customer={customerValue.customer} />
        )}
        <li className="list-group-item d-flex flex-row justify-content-between lh-condensed">
          <Tooltip title="Clear cart">
            <IconButton className="mx-2" onClick={() => clearCart()}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
          <div className="d-flex flex-column justify-content-center
            my-auto ml-auto align-items-center col-4">
            <h4 className="mb-0">
              ${(cartTotalAfterPromotion / 100).toFixed(2)}
            </h4>
          </div>
        </li>
      </ul>
      <>
        {customerValue.customer ? (
          <Link
            to="/success"
            className="link-unstyled"
            style={{textDecoration: 'none'}}
          >
            <Button
              variant="dark"
              onClick={() => {
                value.checkoutCart(customerValue.customer);
                customerValue.updateCustomerData(
                    customerValue.customer.source_id,
                );
              }}
              className="w-100 p-2"
            >
              Proceed to checkout
            </Button>
          </Link>
        ) : (
          <Alert variant="dark">Select customer first!</Alert>
        )}
      </>
    </div>
  );
};

export default CartList;

CartList.propTypes = {
  value: PropTypes.object.isRequired,
  customerValue: PropTypes.object.isRequired,
};
