import React from 'react';
import CartList from './CartList';
import CartCustomerAddress from './CartCustomerAddress';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css';
const Cart = ({ itemsTotalCount }) => {
  return (
    <div className="page">
      {itemsTotalCount > 0 ? (
        <>
          <Row className="pageHeader">
            <Col xs={12}>
              <h1 className="pageTitle">Checkout</h1>
            </Col>
          </Row>
          <Row className="cartPage">
            <CartCustomerAddress />
            <CartList />
          </Row>
        </>
      ) : (
        <Row className="pageHeader">
          <Col xs={12}>
            <h1 className="pageTitle">Your cart is empty</h1>
          </Col>
        </Row>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    itemsTotalCount: state.cartReducer.itemsTotalCount,
  };
};

Cart.propTypes = {
  itemsTotalCount: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Cart);
