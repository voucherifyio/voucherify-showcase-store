import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { CustomerConsumer } from "../CustomerContext";

export default function CartTotals({ value }) {
  const {
    cartTotal,
    clearCart,
    discountedAmount,
    cartTotalAfterPromotion,
    checkoutCart,
  } = value;

  return (
    <div className="col-lg-6">
      <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
        Order summary
      </div>
      <div className="p-4">
        <ul className="list-unstyled mb-4">
          <li className="d-flex justify-content-between py-3 border-bottom">
            <h5>
              <strong className="text-muted">Total</strong>
            </h5>
            <h5 className="font-weight-bold">${cartTotal.toFixed(2)}</h5>
          </li>
          {!_.isEmpty(value.appliedVoucher) && (
            <>
              <li className="d-flex justify-content-between py-3 border-bottom">
                <strong className="text-success">Discount</strong>
                <strong className="text-success">
                  -&nbsp;${discountedAmount.toFixed(2)}
                </strong>
              </li>
              <li className="d-flex justify-content-between py-3 border-bottom">
                <h5>
                  <strong className="text-success">After discount</strong>
                </h5>
                <h5 className="font-weight-bold text-success">
                  ${cartTotalAfterPromotion.toFixed(2)}
                </h5>
              </li>
            </>
          )}
        </ul>
        <Link
          to="/success"
          className="link-unstyled"
          style={{ textDecoration: "none" }}
        >
          <CustomerConsumer>
            {(ctx) => {
              return (
                <button
                  className="btn btn-dark rounded-pill py-2 btn-block mb-2 "
                  onClick={() => {
                    checkoutCart(ctx.customer);
                    ctx.setCustomer(ctx.customer.id);
                  }}
                >
                  Proceed to checkout
                </button>
              );
            }}
          </CustomerConsumer>
        </Link>
        <Link
          to="/"
          className="link-unstyled"
          style={{ textDecoration: "none" }}
        >
          <button
            className="btn btn-danger rounded-pill py-2 btn-block"
            onClick={() => clearCart()}
          >
            Clear cart
          </button>
        </Link>
      </div>
    </div>
  );
}
