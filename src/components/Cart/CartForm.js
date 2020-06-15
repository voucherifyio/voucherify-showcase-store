import React from "react";
import { ProductConsumer } from "../Context";
import { CustomerConsumer } from "../CustomerContext";
import Button from "react-bootstrap/Button";
import "voucherify.js";

window.Voucherify.initialize(
  "f503ecb0-c840-4748-ad75-a17694014b7f",
  "791c2768-347c-44ee-8e67-00eecd7b89a6"
);

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
