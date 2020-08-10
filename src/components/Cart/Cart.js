import React from 'react';
import { ProductConsumer } from '../Context/Context';
import CartList from './CartList';
import CartCustomerAddress from './CartCustomerAddress';
import Alert from 'react-bootstrap/Alert';

const Cart = () => {
  return (
    <div className="container">
      <ProductConsumer>
        {(ctx) => {
          if (ctx.cartItems.length > 0) {
            return (
              <>
                <div className="py-5 text-center">
                  <h2>Checkout form</h2>
                </div>
                <div
                  className="d-flex flex-lg-row flex-md-column
                  justify-content-center"
                >
                  {ctx.customerSelectedCustomer ? (
                    <>
                      <CartList ctx={ctx} />
                      <CartCustomerAddress customer={ctx.customerSelectedCustomer} />
                    </>
                  ) : (
                    <Alert variant="dark">Select customer first!</Alert>
                  )}
                </div>
              </>
            );
          } else {
            return (
              <div className="py-5 text-center">
                <h2>Your cart is empty</h2>
              </div>
            );
          }
        }}
      </ProductConsumer>
    </div>
  );
};
export default Cart;
