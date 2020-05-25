import React, { useState } from "react";
import { ProductConsumer } from "./Context";
import { useParams } from "react-router";

const Details = () => {
  let { productId } = useParams();
  const [quantity, setQuantity] = useState("1");
  const handleOnChange = (e) => {
    setQuantity(e.target.value);
  };
  console.log(quantity);
  return (
    <ProductConsumer>
      {(ctx) => {
        const product = ctx.getItem(parseInt(productId, 10));
        const { id, img, company, info, price, title } = product;
        const inCart = ctx.cart.find((item) => item.id === id);
        return (
          <main className="mt-5 pt-4">
            <div className="container dark-grey-text mt-5">
              <div className="row wow fadeIn">
                <div className="col-md-6 mb-4">
                  <img src={`/${img}`} className="img-fluid" alt="" />
                </div>
                <div className="col-md-6 mb-4">
                  <div className="p-4">
                    <div className="mb-3">
                      <span className="badge badge-dark mr-2">{company}</span>
                      <span className="badge badge-success">In Stock</span>
                    </div>
                    <div className="mb-3">
                      <h2 className="title">{title}</h2>
                      <p className="lead">Price: ${price.toFixed(2)}</p>
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
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        disabled={inCart}
                        onClick={() => {
                          ctx.addToCart(id, quantity);
                        }}
                      >
                        {inCart ? (
                          <span>In cart</span>
                        ) : (
                          <span>Add to cart</span>
                        )}
                      </button>
                    </div>
                    <p className="lead font-weight-bold">Description</p>
                    <p>{info}</p>
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
