import React from "react";
import { ProductConsumer } from "../Context";
import { CustomerConsumer } from "../CustomerContext";
import Button from "react-bootstrap/Button";

const CartForm = () => {
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <CustomerConsumer>
            {(ctx) => {
              return (
                <form className="card p-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Promo code"
                      readOnly
                      value={ctx.copiedCode || ""}
                    />
                    <div className="input-group-append">
                      <Button
                        variant="dark"
                        onClick={() =>
                          value.addPromotionToCart(ctx.copiedCode, ctx.customer)
                        }
                      >
                        Validate
                      </Button>
                    </div>
                  </div>
                </form>
              );
            }}
          </CustomerConsumer>
        );
      }}
    </ProductConsumer>
  );
};
export default CartForm;
