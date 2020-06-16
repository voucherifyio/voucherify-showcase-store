import React, { useState } from "react";
import { ProductConsumer } from "./Context";
import { useParams } from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Details = () => {
  let { productId } = useParams();
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
                      <div className="d-flex align-items-center">
                        <span className="lead">Quantity&nbsp;</span>
                        <Form.Control
                          as="select"
                          id="productQuantity"
                          onChange={(e) => handleOnChange(e.target.value)}
                          value={quantity}
                          disabled={inCart}
                          className="col-4"
                        >
                          {quantities.map((qty) => (
                            <option key={qty} value={qty}>
                              {qty}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
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
