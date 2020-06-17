import React from "react";
import CartItem from "./CartItem";
import _ from "lodash";
import "voucherify.js";
import { ProductConsumer } from "../Context";
import CartForm from "./CartForm";

window.Voucherify.initialize(
  "9bdc4a2e-e669-4821-8901-e0106183d169",
  "99143828-cdbc-489d-beb1-f68838d67859"
);

const CartList = () => {
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
            </h4>
            <ul className="list-group mb-3">
              {value.cart.map((item) => {
                return <CartItem key={item.id} item={item} value={value} />;
              })}
              {!_.isEmpty(value.appliedVoucher) ? (
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">{value.appliedVoucher.code}</h6>
                    <small
                      className="text-muted"
                      onClick={() => value.removePromotionFromCart()}
                      style={{ cursor: "pointer" }}
                    >
                      <strong>Remove</strong>
                    </small>
                  </div>
                  <span className="text-success">
                    -${value.discountedAmount.toFixed(2)}
                  </span>
                </li>
              ) : (
                ""
              )}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${value.cartTotalAfterPromotion.toFixed(2)}</strong>
              </li>
            </ul>
            {_.isEmpty(value.appliedVoucher) ? <CartForm /> : ""}
          </div>
        );
      }}
    </ProductConsumer>
  );
};

export default CartList;
