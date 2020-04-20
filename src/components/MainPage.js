import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class MainPage extends Component {
    render() {
        return (
            <div class="position-relative overflow-hidden p-3 p-md-5 text-center bg-light">
                <div class="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 class="display-4 font-weight-normal">Hot Beans</h1>
                    <p class="lead font-weight-normal">Jumpstart your marketing efforts with this example based on Apple's marketing pages.</p>
                    <Link to='/products' class="btn btn-outline-secondary">Store</Link>
                </div>
                <div class="product-device box-shadow d-none d-md-block"></div>
                <div class="product-device product-device-2 box-shadow d-none d-md-block"></div>
            </div>
        )
    }
}
