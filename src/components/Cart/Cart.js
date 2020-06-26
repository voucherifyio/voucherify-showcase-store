import React from "react";
import { ProductConsumer } from "../Context";
import { CustomerConsumer } from "../CustomerContext";
import CartList from "./CartList";
import CustomerAddress from "./CustomerAddress";
import Alert from "react-bootstrap/Alert";
const Cart = () => {
  return (
    <div className="container">
      <ProductConsumer>
        {(value) => {
          const { cart } = value;
          if (cart.length > 0) {
            return (
              <>
                <div className="py-5 text-center">
                  <h2>Checkout form</h2>
                </div>
                <div className="d-flex flex-lg-row flex-md-column justify-content-center">
                  <CustomerConsumer>
                    {(CustomerValue) => {
                      return (
                        <>
                          {CustomerValue.customer ? (
                            <>
                              <CartList
                                value={value}
                                customerValue={CustomerValue}
                              />
                              <CustomerAddress
                                customer={CustomerValue.customer}
                              />
                            </>
                          ) : (
                            <Alert variant="dark">Select customer first!</Alert>
                          )}
                        </>
                      );
                    }}
                  </CustomerConsumer>
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
