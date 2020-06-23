import React from "react";
import CartItem from "./CartItem";
import _ from "lodash";
import "voucherify.js";
import { ProductConsumer } from "../Context";
import { CustomerConsumer } from "../CustomerContext";
import CartForm from "./CartForm";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import Tooltip from "@material-ui/core/Tooltip";

window.Voucherify.initialize(
  "9bdc4a2e-e669-4821-8901-e0106183d169",
  "99143828-cdbc-489d-beb1-f68838d67859"
);

const CartList = () => {
  return (
    <>
      <ProductConsumer>
        {(value) => {
          return (
            <div className="col-md-12 col-lg-9 order-2">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span>Your cart</span>
              </h4>
              <ul className="list-group mb-3">
                {value.cart.map((item) => {
                  return <CartItem key={item.id} item={item} value={value} />;
                })}
                {!_.isEmpty(value.appliedVoucher) ? (
                  <li className="list-group-item d-flex flex-row justify-content-between lh-condensed">
                    <div className="d-inline my-auto col-4">
                      Discount code{" "}
                      <span className="text-success">
                        {value.appliedVoucher.code}
                      </span>
                    </div>
                    <div className="d-none d-lg-block my-auto mx-auto col-2"></div>
                    <div className="d-none d-lg-block my-auto mx-auto col-2"></div>
                    <div className="d-flex flex-column justify-content-center my-auto mx-auto align-items-center col-2">
                      <small className="text-success">Discount</small>
                      <span className="text-success">
                        -${value.discountedAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <IconButton
                        className="mx-2"
                        onClick={() => value.removePromotionFromCart()}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </li>
                ) : (
                  <CartForm />
                )}
                <li className="list-group-item d-flex flex-row justify-content-between lh-condensed">
                  <Tooltip title="Clear cart">
                    <IconButton
                      className="mx-2"
                      onClick={() => value.clearCart()}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                  <div className="d-flex flex-column justify-content-center my-auto ml-auto align-items-center col-4">
                    <h4 className="mb-0">
                      ${value.cartTotalAfterPromotion.toFixed(2)}
                    </h4>
                  </div>
                </li>
              </ul>
              <>
                <CustomerConsumer>
                  {(CustomerValue) => {
                    return (
                      <>
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
                                CustomerValue.getUniqueVoucher();
                              }}
                              className="w-100 p-2"
                            >
                              Proceed to checkout
                            </Button>
                          </Link>
                        ) : (
                          <Alert variant="dark">Select customer first!</Alert>
                        )}
                      </>
                    );
                  }}
                </CustomerConsumer>
              </>
            </div>
          );
        }}
      </ProductConsumer>
    </>
  );
};

export default CartList;
