import React, { Component } from 'react'
import Product from './Product'
import Title from './Title'
import {ProductConsumer} from './Context'
import { storeProducts } from "../data";

export default class ProductList extends Component {

    render() {
        return (
            <div>
                <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="Our" title="products"></Title>
                        <div className="row">
                            <ProductConsumer>
                                {() => {
                                    return storeProducts.map(
                                        product => {
                                            return <Product key={product.id} product={product}></Product>
                                        }
                                    )}
                                    }
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
                </React.Fragment>
            </div>
        )
    }
}
