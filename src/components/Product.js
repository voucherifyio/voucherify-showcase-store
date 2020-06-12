import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  return (
    <div className="col-md-3 col-sm-6">
      <div className="product-grid4">
        <React.Fragment>
          <Link to={`/details/${props.product.id}`}>
            <div className="product-image4" id={props.product.id}>
              <img className="pic-1" src={props.product.image_url} alt="productImage" />
            </div>
          </Link>
          <div className="product-content">
            <h3 className="title text-left">{props.product.name}</h3>
            <div className="price text-left">${(props.product.price / 100).toFixed(2)}</div>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Product;
