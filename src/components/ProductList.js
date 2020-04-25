import React from "react";
import Product from "./Product";
import Title from "./Title";
import { storeProducts } from "../data";

export default function ProductList() {
  return (
    <div>
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="Our" title="products"></Title>
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