import React from "react";
import Product from "./Product";
import { ProductConsumer } from "./Context";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const ProductList = () => {
  let { filterOption } = useParams();

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
    "Grinders",
    "Electronic Grinders",
    "Hand Grinders",
    "Cups",
  ];
  filterOption = filterOption.split("%20").join(" ");

  return (
    <div>
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <div className="row my-4">
              <div className="col-10 mx-auto my-2 text-center">
                <h1>Our products</h1>
              </div>
              <div className="col-10 mx-auto my-2 text-center">
                <div className="row">
                  <div className="mx-2 my-2">
                    {categories.map((category) => (
                      <>
                        <Button
                          href={`/store/${category}`}
                          variant="dark"
                          size="sm"
                          className="mx-1 my-1"
                        >
                          {category}{" "}
                        </Button>{" "}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <ProductConsumer>
              {(ctx) => {
                console.log(ctx.products);
                let filteredList;
                if (!ctx.fetchingProducts) {
                  switch (filterOption) {
                    case "All":
                      filteredList = ctx.products;
                      break;
                    default:
                      filteredList = ctx.products.filter((product) =>
                        product.metadata.categories.includes(filterOption)
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
                          {filteredList.map((product) => (
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
