import React from "react";
import { ProductConsumer } from "../Context";
import { CustomerConsumer } from "../CustomerContext";
import CartList from "./CartList";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
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

                <div className="row">
                  <CartList value={value} />
                  <CustomerConsumer>
                    {(CustomerValue) => {
                      return (
                        <div className="col-md-8 order-md-1">
                          <h4 className="mb-3">Billing address</h4>
                          <form className="needs-validation" noValidate>
                            <div className="row">
                              <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">First name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="firstName"
                                  placeholder=""
                                  value={
                                    CustomerValue.customer
                                      ? CustomerValue.customer.name.split(
                                          " "
                                        )[0]
                                      : ""
                                  }
                                  readOnly
                                />
                              </div>
                              <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Last name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastName"
                                  placeholder=""
                                  value={
                                    CustomerValue.customer
                                      ? CustomerValue.customer.name.split(
                                          " "
                                        )[1]
                                      : ""
                                  }
                                  readOnly
                                />
                              </div>
                            </div>

                            <div className="mb-3">
                              <label htmlFor="email">
                                Email
                                <span className="text-muted">(Optional)</span>
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={
                                  CustomerValue.customer
                                    ? CustomerValue.customer.email
                                    : ""
                                }
                                readOnly
                              />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="address">Address</label>
                              <input
                                type="text"
                                className="form-control"
                                id="address"
                                value={
                                  CustomerValue.customer
                                    ? CustomerValue.customer.address.line_1
                                    : ""
                                }
                                readOnly
                              />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="address2">
                                Address 2{" "}
                                <span className="text-muted">(Optional)</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="address2"
                                value={
                                  CustomerValue.customer
                                    ? CustomerValue.customer.address.line_2
                                    : ""
                                }
                                readOnly
                              />
                            </div>

                            <div className="row">
                              <div className="col-md-5 mb-3">
                                <label htmlFor="country">Country</label>
                                <input
                                  className="form-control"
                                  id="country"
                                  value={
                                    CustomerValue.customer
                                      ? CustomerValue.customer.address.country
                                      : ""
                                  }
                                  readOnly
                                />
                              </div>
                              <div className="col-md-4 mb-3">
                                <label htmlFor="country">State</label>
                                <input
                                  className="form-control"
                                  id="state"
                                  value={
                                    CustomerValue.customer
                                      ? CustomerValue.customer.address.state
                                      : ""
                                  }
                                  readOnly
                                />
                              </div>
                              <div className="col-md-3 mb-3">
                                <label htmlFor="country">Postal code</label>
                                <input
                                  className="form-control"
                                  id="postal_code"
                                  value={
                                    CustomerValue.customer
                                      ? CustomerValue.customer.address
                                          .postal_code
                                      : ""
                                  }
                                  readOnly
                                />
                              </div>
                            </div>

                            <hr className="mb-4" />

                            {CustomerValue.customer ? (
                              <Link
                                to="/success"
                                className="link-unstyled"
                                style={{ textDecoration: "none" }}
                              >
                                <Button
                                  variant="dark"
                                  onClick={() => {
                                    value.checkoutCart(CustomerValue.customer);
                                    CustomerValue.updateCustomerData(
                                      CustomerValue.customer.source_id
                                    );
                                    CustomerValue.getCampaigns();
                                  }}
                                >
                                  Proceed to checkout
                                </Button>
                              </Link>
                            ) : (
                              <Alert variant="dark">
                                Select customer first!
                              </Alert>
                            )}
                          </form>
                        </div>
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
