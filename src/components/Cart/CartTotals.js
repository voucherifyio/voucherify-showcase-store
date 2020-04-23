import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash'

export default function CartTotals({ value }) {
  const {
    cartSubTotal,
    cartTotal,
    clearCart,
    cartDiscount,
    discounted,
    cartTotalAfterPromotion,
  } = value;

  return (
    <div className='col-lg-6'>
      <div className='bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold'>
        Order summary
      </div>
      <div className='p-4'>
        <ul className='list-unstyled mb-4'>
          <li className='d-flex justify-content-between py-3 border-bottom'>
            <strong className='text-muted'>Subtotal </strong>
            <strong>${cartSubTotal}</strong>
          </li>
          <li className='d-flex justify-content-between py-3 border-bottom'>
            <h5>
              <strong className='text-muted'>Total</strong>
            </h5>
            <h5 className='font-weight-bold'>${cartTotal}</h5>
          </li>
          {!_.isEmpty(value.appliedVoucher) && (
            <>
              <li className='d-flex justify-content-between py-3 border-bottom'>
                <strong className='text-success'>Discount</strong>
                <strong className='text-success'>-&nbsp;${discounted}</strong>
              </li>
              <li className='d-flex justify-content-between py-3 border-bottom'>
                <h5>
                  <strong className='text-success'>After discount</strong>
                </h5>
                <h5 className='font-weight-bold text-success'>
                  ${cartTotalAfterPromotion}
                </h5>
              </li>
            </>
          )}
        </ul>
        <Link
          to='/success'
          className='link-unstyled'
          style={{ 'text-decoration': 'none' }}>
          <button
            className='btn btn-dark rounded-pill py-2 btn-block mb-2 '
            onClick={() => clearCart()}>
            Proceed to checkout
          </button>
        </Link>
        <Link
          to='/'
          className='link-unstyled'
          style={{ 'text-decoration': 'none' }}>
          <button
            className='btn btn-danger rounded-pill py-2 btn-block'
            onClick={() => clearCart()}>
            Clear cart
          </button>
        </Link>
      </div>
    </div>
  );
}
