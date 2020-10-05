import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItemToCart } from '../../redux/actions/cartActions';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { isEmpty } from '../../redux/utils';

const DiscountBadge = withStyles(() => ({
  badge: {
    backgroundColor: 'var(--orange)',
    color: 'var(--white)',
    borderRadius: '5px',
    padding: '10px',
  },
}))(Badge);

const ProductCard = ({ product, addItemToCart, productCampaigns }) => {
  return (
    <Col lg={4} md={6} sm={6} xs={12}>
      <div className="productCard">
        <Link to={`/details/${product.id}`}>
          <div>
            <DiscountBadge
              badgeContent="Sale"
              invisible={isEmpty(productCampaigns)}
            >
              <img
                className="productCardImage"
                src={product.image_url}
                alt={product.name}
              />
            </DiscountBadge>
          </div>
        </Link>
        <div className="productCardContent">
          <h6 className="productCardTitle">{product.name}</h6>
          <div className="productCardDetails"></div>
          <Button
            onClick={() => {
              addItemToCart();
            }}
            className="voucherifyButtonDark"
          >
            ${(product.price / 100).toFixed(2)} - Add to cart
          </Button>
        </div>
      </div>
    </Col>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  productCampaigns: PropTypes.array,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { product } = ownProps;
  return {
    addItemToCart: () =>
      dispatch(addItemToCart(product.id, 1, 'increment_count')),
  };
};

export default connect(null, mapDispatchToProps)(ProductCard);
