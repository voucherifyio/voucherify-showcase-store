import React from 'react';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../Context/Context';

const PageSuccess = () => {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col my-5">
          <div>
            <h1 className="text-center">Order completed</h1>
            <h2 className="text-center">Thank you for your order!</h2>
            <ProductConsumer>
              {(ctx) => {
                return (
                  <div className="text-center mb-5">ID: {ctx.cartOrderId}</div>
                );
              }}
            </ProductConsumer>
            <Link to="/" className="inline-block btn btn-outline-secondary">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSuccess;
