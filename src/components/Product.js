import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { ProductConsumer } from './Context'
import  PropTypes from 'prop-types'


export default class Product extends Component {
    render() {
        const {id, title, img, price} = this.props.product
        return (
            <div className="col-md-3 col-sm-6">
                <div className="product-grid4">
                    <ProductConsumer>
                        {value => (
                            <React.Fragment>
                            <Link to="/details">
                                <div className="product-image4" id={id} onClick={() => value.handleDetail(id)}>
                                        <img className="pic-1" src={img} alt="productImage"/>
                                    {/* </Link> */}
                                    {/* <span class="product-new-label">New</span> */}
                                    {/* <span class="product-discount-label">-10%</span> */}
                                </div>
                            </Link>
                            <div className="product-content">
                                <h3 className="title text-left">{title}</h3>
                                <div className="price text-left">
                                    ${price}
                                </div>
                            </div>
                            </React.Fragment>
                        )}
                        </ProductConsumer>
                </div>
            </div>
        )
    }
}

Product.propTypes = {
    product: PropTypes.shape({
        id:PropTypes.number,
        img:PropTypes.string,
        title:PropTypes.string,
        price:PropTypes.number,
        inCart:PropTypes.bool
    }).isRequired
}