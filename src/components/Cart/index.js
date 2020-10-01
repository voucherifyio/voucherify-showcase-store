import React, { useEffect } from 'react';
import CartList from './CartList';
import CartCustomerAddress from './CartCustomerAddress';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Cart = ({ itemsTotalCount }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page">
      {itemsTotalCount > 0 ? (
        <>
          <Row noGutters className="pageHeader checkoutHeader">
            <Col xs={12}>
              <h1 className="pageTitle">Checkout</h1>
              <Link to="/">
                <Button className="voucherifyButtonOrange">
                  Continue shopping{' '}
                </Button>
              </Link>
            </Col>
          </Row>
          <Row noGutters className="pageHeader checkoutHeader">
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
