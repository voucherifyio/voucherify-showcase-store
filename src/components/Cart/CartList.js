import React from 'react';
import CartItem from './CartItem';
import _ from 'lodash';
import CartForm from './CartForm';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import { setPaymentMethod, getCustomer } from '../../redux/actions/userActions';
import {
  clearCart,
  checkoutCart,
  removePromotionFromCart,
} from '../../redux/actions/cartActions';

const CartList = ({
  items,
  paymentMethod,
  selectedCustomer,
  totalAmountAfterDiscount,
  dispatch,
  discount,
  discountedAmount,
}) => {
  return (
    <div className="col-md-12 col-lg-9 order-2">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span>Your cart</span>
      </h4>
      <ul className="list-group mb-3">
        {items.map((item) => {
          return <CartItem key={item.id} id={item.id} />;
        })}
        <li className="list-group-item d-flex lh-condensed">
          <div className="my-auto col-4">
            Payment method: <strong>{paymentMethod}</strong>
          </div>
          <div className="d-flex my-auto col-4">
            <Chip
              className="mr-1"
              onClick={() => dispatch(setPaymentMethod('Visa'))}
              label="Visa"
            ></Chip>
            <Chip
              className="mr-1"
              onClick={() => dispatch(setPaymentMethod('MasterCard'))}
              label="MasterCard"
            ></Chip>
            <Chip
              className="mr-1"
              onClick={() => dispatch(setPaymentMethod('Other'))}
              label="Other"
            ></Chip>
          </div>
        </li>
        {!_.isEmpty(discount) ? (
          <li className="list-group-item d-flex flex-row justify-content-between lh-condensed">
            {!_.isEmpty(discount) && discount.hasOwnProperty('code') && (
              <>
                <div className="d-inline my-auto col-4">
                  Discount code{' '}
                  <span className="text-success">{discount.code}</span>
                </div>
              </>
            )}
            {!_.isEmpty(discount) && discount.hasOwnProperty('banner') && (
              <>
                <div className="d-inline my-auto col-4">
                  Active Promotion{' '}
                  <span className="text-success">
                    {discount.metadata.demostoreName}
                  </span>
                </div>
              </>
            )}

            <div className="d-none d-lg-block my-auto mx-auto col-2"></div>
            <div className="d-none d-lg-block my-auto mx-auto col-2"></div>
            <div
              className="d-flex flex-column justify-content-center
              my-auto mx-auto align-items-center col-2"
            >
              <small className="text-success">Discount</small>
              <span className="text-success">
                -${(discountedAmount / 100).toFixed(2)}
              </span>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <IconButton
                className="mx-2"
                onClick={() => dispatch(removePromotionFromCart())}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </li>
        ) : (
          <>
            <CartForm />
          </>
        )}
        <li className="list-group-item d-flex flex-row justify-content-between lh-condensed">
          <Tooltip title="Clear cart">
            <IconButton className="mx-2" onClick={() => dispatch(clearCart())}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
          <div
            className="d-flex flex-column justify-content-center
            my-auto ml-auto align-items-center col-4"
          >
            <h4 className="mb-0">
              ${(totalAmountAfterDiscount / 100).toFixed(2)}
            </h4>
          </div>
        </li>
      </ul>
      <>
        {selectedCustomer ? (
          <Link
            to="/success"
            className="link-unstyled"
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="dark"
              onClick={() => {
                dispatch(checkoutCart())
                .then(() => dispatch(getCustomer(selectedCustomer.source_id, 'update'))
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

const mapStateToProps = (state) => {
  return {
    selectedCustomer: state.userReducer.selectedCustomer,
    itemsTotalCount: state.cartReducer.itemsTotalCount,
    totalAmountAfterDiscount: state.cartReducer.totalAmountAfterDiscount,
    discount: state.cartReducer.discount,
    discountedAmount: state.cartReducer.discountedAmount,
    paymentMethod: state.userReducer.paymentMethod,
    items: state.cartReducer.items,
  };
};

export default connect(mapStateToProps)(CartList);

CartList.propTypes = {
  items: PropTypes.array,
  selectedCustomer: PropTypes.object,
  dispatch: PropTypes.func,
  paymentMethod: PropTypes.string,
  discount: PropTypes.object,
  totalAmountAfterDiscount: PropTypes.number,
  discountedAmount: PropTypes.number,
};
