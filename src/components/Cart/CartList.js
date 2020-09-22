import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import DiscountForm from './DiscountForm';
import PaymentMethod from './PaymentMethod';
import CartTotals from './CartTotals';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentCustomer } from '../../redux/actions/userActions';
import { checkoutCart } from '../../redux/actions/cartActions';
import { isEmpty } from '../../redux/utils';
import ValidatedDiscount from './ValidatedDiscount';

const CartList = ({
  items,
  currentCustomer,
  dispatch,
  discount,
  enableCartDiscounts,
}) => {
  const [discountForm, setDiscountForm] = useState(true);

  // We're checking if we should enable input field for Voucher - if the Cart Discount
  // is active then we're hiding the input

  useEffect(() => {
    if (!isEmpty(discount) || enableCartDiscounts) {
      setDiscountForm(false);
    } else {
      setDiscountForm(true);
    }
  }, [discount, enableCartDiscounts]);

  return (
    <div className="col-md-12 col-lg-9 order-2">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span>Your cart</span>
      </h4>
      <ul className="list-group mb-3">
        {items.map((item) => (
          <CartItem key={item.id} id={item.id} />
        ))}
        <PaymentMethod />
        {discountForm && <DiscountForm />}
        {!isEmpty(discount) && <ValidatedDiscount />}
        <CartTotals />
      </ul>
      <Link
        to="/success"
        className="link-unstyled"
        style={{ textDecoration: 'none' }}
      >
        <Button
          variant="dark"
          onClick={async () => {
            await dispatch(checkoutCart());
            dispatch(getCurrentCustomer(currentCustomer.source_id, 'update'));
          }}
          className="w-100 p-2"
        >
          Proceed to checkout
        </Button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentCustomer: state.userReducer.currentCustomer,
    itemsTotalCount: state.cartReducer.itemsTotalCount,
    discount: state.cartReducer.discount,
    discountedAmount: state.cartReducer.discountedAmount,
    items: state.cartReducer.items,
    enableCartDiscounts: state.userReducer.enableCartDiscounts,
  };
};

export default connect(mapStateToProps)(CartList);

CartList.propTypes = {
  items: PropTypes.array,
  currentCustomer: PropTypes.object,
  dispatch: PropTypes.func,
  discount: PropTypes.object,
  discountedAmount: PropTypes.number,
  enableCartDiscounts: PropTypes.bool,
};
