import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { id, title, img, price } = props.product;
  return (
    <div className="col-md-3 col-sm-6">
      <div className="product-grid4">
        <React.Fragment>
          <Link to={`/details/${id}`}>
            <div className="product-image4" id={id}>
              <img className="pic-1" src={img} alt="productImage" />
            </div>
          </Link>
          <div className="product-content">
            <h3 className="title text-left">{title}</h3>
            <div className="price text-left">${price}</div>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Product;
