import React, { useState } from "react";
import Product from "./Product";
import { ProductConsumer } from "./Context";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

const ProductList = () => {
  const [filterCategory, setFilterCategory] = useState("");

  const handleSelectCategory = (name) => {
    setFilterCategory(name);
  };

  const categories = [
    "All",
    "Coffee",
    "Whole Bean",
    "Fairtrade",
    "Single Origin",
    "Ground",
    "Decaffeinated",
    "Coffee Machines",
    "Accessories",
  ];

  const sortData = (a, b) => {
    if (parseInt(a.source_id, 10) < parseInt(b.source_id,10)) {
      return -1;
    } else if (parseInt(a.source_id, 10) > parseInt(b.source_id,10)) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <div className="py-5">
        <div className="container">
          <div className="row my-4">
            <div className="col-10 mx-auto my-2 text-center">
              <h1>Our products {filterCategory && `- ${filterCategory}`}</h1>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <Form.Control
                as="select"
                id="storeProducts"
                onChange={(e) => handleSelectCategory(e.target.value)}
                value={filterCategory || "DEFAULT"}
                className=""
              >
                <option key="DEFAULT" value="DEFAULT" disabled>
                  Select product category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </div>
          </div>
          <ProductConsumer>
            {(ctx) => {
              let filteredList;
              if (!ctx.fetchingProducts) {
                switch (filterCategory) {
                  case "":
                  case "All":
                    filteredList = ctx.products;
                    break;
                  default:
                    filteredList = ctx.products.filter((product) =>
                      product.metadata.categories.includes(filterCategory)
                    );
                    break;
                }
              }
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
                        {filteredList.sort(sortData).map((product) => (
                          <React.Fragment key={product.id}>
                            <Product
                              key={product.id}
                              product={product}
                              value={ctx}
                            ></Product>
                          </React.Fragment>
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
    </div>
  );
};

export default ProductList;
