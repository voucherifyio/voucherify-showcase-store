import React, { Component } from 'react'
import Title from '../Title'
import EmptyCart from './EmptyCart'
import {ProductConsumer} from '../Context'
import CartList from './CartList'
import CartTotals from './CartTotals'
import CartForm from './CartForm'

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
                                    <React.Fragment>
                                    
                                    <Title name="Your" title="cart"></Title>

                                    <div className="container">
                                        <div className="col-lg-12 p-5 bg-white rounded shadow-sm my-2">

                                                <CartList value={value}/>
                                        </div>
                                </div>       
                                </React.Fragment>
                             
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
                                    <div className="row py-5 p-4 bg-white rounded shadow-sm">
                                        <React.Fragment>
                                            <CartForm />
                                            <CartTotals value={value} />
                                        </React.Fragment>
                                    </div>
                        );
                    }
                }}
                    </ProductConsumer>

                </div>    
            </div>
        )
    }
}
