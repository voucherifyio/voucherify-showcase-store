import React, {useState} from 'react';
import Product from './Product';
import {ProductConsumer} from './Context';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import _ from 'lodash';

const ProductList = () => {
  const [filterCategory, setFilterCategory] = useState('');

  const categories = [
    'All',
    'Coffee',
    'Whole Bean',
    'Fairtrade',
    'Single Origin',
    'Ground',
    'Decaffeinated',
    'Coffee Machines',
    'Accessories',
  ];

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
                onChange={(e) => setFilterCategory(e.target.value)}
                value={filterCategory || 'DEFAULT'}
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
                  case '':
                  case 'All':
                    filteredList = ctx.products;
                    break;
                  default:
                    filteredList = ctx.products.filter((product) =>
                      product.metadata.categories.includes(filterCategory),
                    );
                    break;
                }
                filteredList = _.orderBy(filteredList, ['source_id'],['asc']);
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
                          <React.Fragment key={product.id}>
                            <Product
                              key={product.id}
                              product={product}
                              storeLogic={ctx}
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
