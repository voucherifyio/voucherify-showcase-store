import React, { useState } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { addItemToCart } from '../../redux/actions/cartActions';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductQuantityForm from './ProductQuantityForm';
import Badge from 'react-bootstrap/Badge';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';

const Product = ({ products, dispatch }) => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState('1');
  const handleOnChange = (e) => {
    setQuantity(e.target.value);
  };
  const product = products.find((product) => product.id === productId);

  return (
    <div className="page">
      <Row className="pageHeader">
        <Col md={5}>
          <div className="productImageWrapper">
            <img
              src={product.image_url}
              className="productImage"
              alt={product.name}
            />
          </div>
        </Col>
        <Col>
          <div>
            <div className="pageHeader">
              <Badge pill variant="dark">
                {product.metadata.company}
              </Badge>
              <h2 className="productName">{product.name}</h2>
              <h5>Price: ${(product.price / 100).toFixed(2)}</h5>
            </div>
            <div className="productActions">
              <ProductQuantityForm
                handleOnChange={handleOnChange}
                quantity={quantity}
              />
              <IconButton
                className="productActionButton"
                onClick={() => dispatch(addItemToCart(product.id, quantity))}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </div>
            <p className="productDescription">{product.metadata.info}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.storeReducer.products,
    itemsTotalCount: state.cartReducer.itemsTotalCount,
  };
};

export default connect(mapStateToProps)(Product);

Product.propTypes = {
  dispatch: PropTypes.func,
  products: PropTypes.array.isRequired,
  itemsTotalCount: PropTypes.number.isRequired,
};
