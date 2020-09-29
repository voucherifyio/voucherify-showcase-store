import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import PaymentMethod from './PaymentMethod';
import CartDiscountForm from './CartDiscountForm';
import CartDiscount from './CartDiscount';
import CartTotals from './CartTotals';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentCustomer } from '../../redux/actions/userActions';
import { checkoutCart } from '../../redux/actions/cartActions';
import { isEmpty } from '../../redux/utils';
import Col from 'react-bootstrap/Col';

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
    <Col className="cartListWrapper">
      <h4>Your cart</h4>
      <div className="cartWrapper">
        {items.map((item) => (
          <CartItem key={item.id} id={item.id} />
        ))}
        <PaymentMethod />
        {discountForm && <CartDiscountForm />}
        {!isEmpty(discount) && <CartDiscount />}
        <CartTotals />
      </div>
      <Link to="/success">
        <Button
          variant="dark"
          className="checkoutButton"
          onClick={async () => {
            await dispatch(checkoutCart());
            dispatch(getCurrentCustomer(currentCustomer.source_id, 'update'));
          }}
        >
          Pay now
        </Button>
      </Link>
    </Col>
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
