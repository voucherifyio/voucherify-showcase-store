import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItemToCart } from '../../redux/actions/cartActions';
import Col from 'react-bootstrap/Col';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';

const ProductCard = ({ product, addItemToCart }) => {
  return (
    <Col lg={4} md={6} sm={6} xs={12}>
      <div className="productCard">
        <Link to={`/details/${product.id}`}>
          <div>
            <img
              className="productCardImage"
              src={product.image_url}
              alt={product.name}
            />
          </div>
        </Link>
        <div className="productCardContent">
          <div className="productCardDetails">
            <h6 className="productCardTitle">{product.name}</h6>
            <h6>${(product.price / 100).toFixed(2)}</h6>
          </div>
          <IconButton
            className="productCardButton"
            onClick={() => {
              addItemToCart();
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </div>
      </div>
    </Col>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  addItemToCart: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { product } = ownProps;
  return {
    addItemToCart: () =>
      dispatch(addItemToCart(product.id, 1, 'increment_count')),
  };
};

export default connect(null, mapDispatchToProps)(ProductCard);
