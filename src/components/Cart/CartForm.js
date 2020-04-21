import React, { useState } from 'react'
import { ProductConsumer } from '../Context'

export default function CartForm() {
  const [couponCode, setCouponCode] = useState('');

  return (
    <ProductConsumer>
      { ctx =>
        (
          <div className="col-lg-6">
              <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon code</div>
              <div className="p-4">
                <div className="d-flex" style={{ flexDirection: "column" }}>
                  <div className="input-group mb-4 border rounded-pill p-2">
                    <input
                      type="text"
                      placeholder="Apply coupon"
                      name="couponCode"
                      onChange={event => setCouponCode(event.target.value)}
                      aria-describedby="button-addon3"
                      class="form-control border-0"
                    />
                  </div>
                  <button id="button-addon3" type="button" onClick={() => ctx.addPromotionToCart(couponCode)} class="btn btn-dark px-4 rounded-pill">
                    <i class="fa fa-gift mr-2"/>
                    Apply coupon
                  </button>
                </div>
              </div>
          </div>
        )
      }
    </ProductConsumer>
  );
};
  