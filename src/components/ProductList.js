import React from "react";
import Product from "./Product";
import { ProductConsumer } from "./Context";
import Spinner from "react-bootstrap/Spinner";

const ProductList = () => {
  return (
    <div>
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <div className="row my-4">
              <div className="col-10 mx-auto my-2 text-center">
                <h1>Our products</h1>
              </div>
            </div>
            <ProductConsumer>
              {(ctx) => {
                return (
                  <>
                    {ctx.fetchingProducts ? (
                      <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      </div>
                    ) : (
                      <>
                        <div className="row">
                          {ctx.products.map((product) => (
                            <Product
                              key={product.id}
                              product={product}
                            ></Product>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                );
              }}
            </ProductConsumer>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default ProductList;
