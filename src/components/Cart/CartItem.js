import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  removeItemFromCart,
  addItemToCart,
} from '../../redux/actions/cartActions';
import CartItemQuantityForm from './CartItemQuantityForm';
import Tooltip from '@material-ui/core/Tooltip';

const CartItem = ({ id, dispatch, items }) => {
  const { name, price, count, total, image_url } = items.find(
    (item) => item.id === id
  );
  const handleOnChange = (e) => {
    dispatch(addItemToCart(id, parseInt(e.target.value, 10)));
  };
  const productPrice = `$${(price / 100).toFixed(2)}`;
  const productTotalPrice = `$${(total / 100).toFixed(2)}`;

  return (
    <>
      <Row noGutters={true} className="cartItem">
        <Col xs={3} md={2}>
          <div className="cartItemImageWrapper">
            <Link to={`/details/${id}`}>
              <img className="cartItemImage" src={image_url} alt={name} />
            </Link>
          </div>
        </Col>
        <Col>
          <Row className="cartItemDetailsRow1">
            <Col xs={12} md={3} className="cartItemName">
              {name}
            </Col>
            <Col xs={9} md={7}>
              <Row className="cartItemDetailsRow2">
                <Col xs={12} md={4} className="cartItemPrice d-none d-md-flex">
                  <span className="cartItemPricePrefix">Price:</span>
                  {productPrice}
                </Col>
                <Col xs={6} md={4} className="cartItemQuantity">
                  <CartItemQuantityForm
                    count={count}
                    handleOnChange={handleOnChange}
                  />
                </Col>
                <Col xs={6} md={4} className="cartItemPrice">
                  <span className="cartItemPricePrefix">Total:</span>
                  {productTotalPrice}
                </Col>
              </Row>
            </Col>
            <Col xs={3} md={2} className="cartItemRemove">
              <Tooltip title="Remove item from cart">
                <IconButton
                  edge="start"
                  onClick={() => dispatch(removeItemFromCart(id))}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.cartReducer.items,
  };
};

export default connect(mapStateToProps)(CartItem);

CartItem.propTypes = {
  items: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
};
