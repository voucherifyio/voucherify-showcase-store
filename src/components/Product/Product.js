import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const Product = ({product, storeLogic}) => {
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
                  storeLogic.addToCart(product.id, 1);
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

export default Product;

Product.propTypes = {
  product: PropTypes.object.isRequired,
  storeLogic: PropTypes.object.isRequired,
};
