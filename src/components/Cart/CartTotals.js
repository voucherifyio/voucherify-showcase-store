import React from 'react'
import {Link} from 'react-router-dom'
import {ProductConsumer} from '../Context'

export default function CartTotals({value}) {
   
    const {cartSubTotal, cartTax, cartTotal, clearCart, cartDiscount, cartTotalAfterPromotion} = value

    
    return (
        // <div className="row py-5 p-4 bg-white rounded shadow-sm">
            

        <div className="col-lg-6">
            <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                <div className="p-4">
                    <ul className="list-unstyled mb-4">
                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Subtotal </strong><strong>${cartSubTotal}</strong></li>
                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Tax</strong><strong>${cartTax}</strong></li>
                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                        <h5 className="font-weight-bold">${cartTotal}</h5>
                        </li>
                            <ProductConsumer>
                            {value => {
                                const {promotionItemsNumber} = value;
                                if (promotionItemsNumber > 0 ){
                                    return (
                                        <>
                                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-success">Discount</strong><strong className="text-success">- ${cartDiscount}</strong></li>
                                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-success">After promotion</strong><h5 className="font-weight-bold text-success">${cartTotalAfterPromotion}</h5></li>
                                        </>
                                        );
                                } 
                                }}
                            </ProductConsumer>
                    </ul>
                    <Link to="#" className="btn btn-dark rounded-pill py-2 btn-block mb-2">Procceed to checkout</Link>
                    <Link to="/">
                        <button className="btn btn-danger rounded-pill py-2 btn-block" onClick={() => clearCart()}>Clear cart</button>
                    </Link>
                </div>
            </div>
        // </div>
    )
}
