import React from 'react'
import {Link} from 'react-router-dom'

export default function CartTotals({value}) {

    const {cartSubTotal, cartTax, cartTotal, clearCart} = value

    return (
        <div className="row py-5 p-4 bg-white rounded shadow-sm">
        <div className="col-lg-6">
            <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon code</div>
                <div className="p-4">
                    <div className="input-group mb-4 border rounded-pill p-2">
                        <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3" class="form-control border-0"/>
                            <div className="input-group-append border-0">
                                <button id="button-addon3" type="button" class="btn btn-dark px-4 rounded-pill"><i class="fa fa-gift mr-2"></i>Apply coupon</button>
                            </div>
                    </div>
                </div>
            </div>
        <div className="col-lg-6">
            <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                <div className="p-4">
                    <ul className="list-unstyled mb-4">
                        <li className="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Subtotal </strong><strong>${cartSubTotal}</strong></li>
                        <li className="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Tax</strong><strong>${cartTax}</strong></li>
                        <li className="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Total</strong>
                        <h5 className="font-weight-bold">${cartTotal}</h5>
                        </li>
                    </ul>
                    <Link to="#" className="btn btn-dark rounded-pill py-2 btn-block mb-2">Procceed to checkout</Link>
                    <Link to="/">
                        <button className="btn btn-danger rounded-pill py-2 btn-block" onClick={() => clearCart()}>Clear cart</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
