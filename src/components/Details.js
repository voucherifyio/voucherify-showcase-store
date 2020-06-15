import React, { useState } from "react";
import { ProductConsumer } from "./Context";
import { useParams } from "react-router";
import Button from "react-bootstrap/Button";

const Details = () => {
  let { productId } = useParams();
  const [quantity, setQuantity] = useState("1");
  const handleOnChange = (e) => {
    setQuantity(e.target.value);
  };
  return (
    <ProductConsumer>
      {(ctx) => {
        const product = ctx.getItem(productId);
        const inCart = ctx.cart.find((item) => item.id === product.id);
        return (
          <main className="mt-5 pt-4">
            <div className="container dark-grey-text mt-5">
              <div className="row wow fadeIn">
                <div className="col-md-6 mb-4">
                  <img src={product.image_url} className="img-fluid" alt="" />
                </div>
                <div className="col-md-6 mb-4">
                  <div className="p-4">
                    <div className="mb-3">
                      <span className="badge badge-dark mr-2">
                        {product.metadata.company}
                      </span>
                      <span className="badge badge-success">In Stock</span>
                    </div>
                    <div className="mb-3">
                      <h2 className="title">{product.name}</h2>
                      <p className="lead">
                        Price: ${(product.price / 100).toFixed(2)}
                      </p>
                      <span className="lead">Quantity:</span>
                      <select
                        value={quantity}
                        onChange={handleOnChange}
                        disabled={inCart}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <Button
                        variant="dark"
                        disabled={inCart}
                        onClick={() => {
                          ctx.addToCart(product.id, quantity);
                        }}
                      >
                        {inCart ? (
                          <span>In cart</span>
                        ) : (
                          <span>Add to cart</span>
                        )}
                      </Button>
                    </div>
                    <p className="lead font-weight-bold">Description</p>
                    <p>{product.metadata.info}</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );
      }}
    </ProductConsumer>
  );
};

export default Details;
