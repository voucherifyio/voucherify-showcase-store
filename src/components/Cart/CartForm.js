import React, { useState } from "react";
import { CustomerConsumer } from "../CustomerContext";
import Button from "react-bootstrap/Button";

const CartForm = ({ value }) => {
  const [code, setCode] = useState("");
  const { addPromotionToCart } = value;

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleValidate = (code, customer) => {
    if (code !== "") {
      addPromotionToCart(code, customer);
    }
  };

  return (
    <CustomerConsumer>
      {(ctx) => {
        return (
          <li className="list-group-item d-flex lh-condensed">
            <div className="d-flex my-auto col-4">Discount code</div>
            <div className="d-flex flex-column justify-content-center col-8">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Voucher"
                    value={code}
                    onChange={handleChange}
                  />
                  <div className="input-group-append">
                    <Button
                      type="submit"
                      variant="dark"
                      onClick={() => {
                        handleValidate(code, ctx.customer);
                      }}
                    >
                      Validate
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </li>
        );
      }}
    </CustomerConsumer>
  );
};
export default CartForm;
