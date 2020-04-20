import React, { Component } from 'react'
import Product from './Product'
import Title from './Title'
import {ProductConsumer} from './Context'
// import Search from './Search'
export default class ProductList extends Component {

    render() {
        return (
            <div>
                <React.Fragment>
                {/* <Search></Search> */}
                <div className="py-5">
                    <div className="container">
                        <Title name="Our" title="products"></Title>
                        <div className="row">
                            <ProductConsumer>
                                {(value) => {
                                    return value.products.map(
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
