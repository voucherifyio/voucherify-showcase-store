import React, { Component } from 'react'
import Title from '../Title'
import EmptyCart from './EmptyCart'
import {ProductConsumer} from '../Context'
import CartList from './CartList'
import CartTotals from './CartTotals'

export default class Cart extends Component {
    render() {
        return (
            <div className="pb-5">
                <div className="container">
                    <ProductConsumer>
                        {value => {
                            const {cart} = value;
                            if (cart.length > 0 ){
                                return (
                                    <div className="container">
                                        <div className="col-lg-12 p-5 bg-white rounded shadow-sm my-2">
                                            <React.Fragment>
                                                <CartList value={value}/>
                                            </React.Fragment>
                                        </div>
                                </div>                                    
                                );
                            } else {
                                return (
                                <EmptyCart />
                                )
                            }
                        }}
                    </ProductConsumer>
                    
                    <ProductConsumer>
                    {value => {
                            const {cart} = value;
                            if (cart.length > 0 ){
                                return (
                            <React.Fragment>
                                <CartTotals value={value} />
                            </React.Fragment>
                        );
                    }
                }}
                    </ProductConsumer>
                </div>    
            </div>
        )
    }
}
