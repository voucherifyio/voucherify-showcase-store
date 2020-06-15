import React from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "./Context";
import Button from "react-bootstrap/Button";

const Product = (props) => {
  return (
    <div className="col-md-4 col-sm-6">
      <div className="product-grid4">
        <React.Fragment>
          <Link to={`/details/${props.product.id}`}>
            <div className="product-image4" id={props.product.id}>
              <img
                className="pic-1"
                src={props.product.image_url}
                alt="productImage"
              />
            </div>
          </Link>
          <div className="product-content">
            <h3 className="title text-left">{props.product.name}</h3>
            <div className="product-details">
              <div className="price text-left">
                ${(props.product.price / 100).toFixed(2)}
              </div>
              <ProductConsumer>
                {(ctx) => {
                  const inCart = ctx.cart.find(
                    (item) => item.id === props.product.id
                  );
                  return (
                    <Button
                      variant="dark"
                      size="sm"
                      disabled={inCart}
                      onClick={() => {
                        ctx.addToCart(props.product.id, 1);
                      }}
                    >
                      {inCart ? <span>In cart</span> : <span>Add to cart</span>}
                    </Button>
                  );
                }}
              </ProductConsumer>
            </div>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Product;
