import React, { useState } from 'react';
import { ProductConsumer } from '../Context';

export default function CartForm() {
  const [couponCode, setCouponCode] = useState('');

  return (
    <ProductConsumer>
      {(value) => {
        if (value.appliedCouponCode !== '') {
          return (
            <div className='col-lg-6'>
              <div className='bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold'>
                Coupon code
              </div>
              <div className='p-4'>
                <div
                  className='d-flex'
                  style={{ flexDirection: 'column' }}
                ></div>
                <h1 className='text-center'>
                  <span className='badge badge-pill badge-success'>
                    {value.appliedCouponCode}
                    <span
                      className='ml-4'
                      onClick={() => value.removePromotionFromCart()}
                    >
                      <i className='fas fa-times'></i>
                    </span>
                  </span>
                </h1>
              </div>
            </div>
          );
        } else {
          return (
            <div className='col-lg-6'>
              <div className='bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold'>
                Coupon code
              </div>
              <div className='p-4'>
                <div className='d-flex' style={{ flexDirection: 'column' }}>
                  <div className='input-group mb-4 border rounded-pill p-2'>
                    <input
                      type='text'
                      placeholder='Apply coupon'
                      name='couponCode'
                      onChange={(event) => setCouponCode(event.target.value)}
                      aria-describedby='button-addon3'
                      className='form-control border-0'
                    />
                  </div>
                  <button
                    id='button-addon3'
                    type='button'
                    onClick={() => value.addPromotionToCart(couponCode)}
                    className='btn btn-dark px-4 rounded-pill'
                  >
                    <i className='fa fa-gift mr-2' />
                    Apply coupon
                  </button>
                </div>
              </div>
            </div>
          );
        }
      }}
    </ProductConsumer>
  );
}
