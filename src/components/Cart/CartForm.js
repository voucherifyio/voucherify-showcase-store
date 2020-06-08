import React from "react";
import { ProductConsumer } from "../Context";
import { CustomerConsumer } from "../CustomerContext";

import "voucherify.js";

window.Voucherify.initialize(
  "f503ecb0-c840-4748-ad75-a17694014b7f",
  "791c2768-347c-44ee-8e67-00eecd7b89a6"
);

const CartForm = () => {
  // const [couponCode, setCouponCode] = useState("");

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
                      // onChange={(event) => setCouponCode(event.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() =>
                          value.addPromotionToCart(ctx.copiedCode, ctx.customer)
                        }
                      >
                        Validate
                      </button>
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
