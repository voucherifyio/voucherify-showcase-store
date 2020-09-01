import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItemToCart } from '../../redux/actions/cartActions';

const Product = ({ product, addItemToCart }) => {
  return (
    <div className="col-lg-4 p-4 col-md-12 col-sm-12">
      <div className="product-grid">
        <React.Fragment>
          <Link to={`/details/${product.id}`}>
            <div className="product-image p-4" id={product.id}>
              <img
                className="pic-1"
                src={product.image_url}
                alt={product.name}
              />
            </div>
          </Link>
          <div className="product-content">
            <h3 className="title text-left">{product.name}</h3>
            <div className="product-details">
              <div className="price text-left">
                ${(product.price / 100).toFixed(2)}
              </div>
              <Button
                variant="dark"
                size="sm"
                onClick={() => {
                  addItemToCart();
                }}
              >
                <span>+ Cart</span>
              </Button>
            </div>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addItemToCart: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { product } = ownProps;
  return {
    addItemToCart: () => dispatch(addItemToCart(product.id, 1, 'increment_count')),
  };
};

export default connect(null, mapDispatchToProps)(Product);
