import React from "react";
import Product from "./Product";
import { storeProducts } from "../data";

export default function ProductList() {
  return (
    <div>
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <div className="row my-4">
              <div className="col-10 mx-auto my-2 text-center">
                <h1>
                  Our products
                </h1>
              </div>
            </div>
            <div className="row">
              {storeProducts.map((product) => {
                return <Product key={product.id} product={product}></Product>;
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}
