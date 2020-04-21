import React, { Component } from 'react'
import {ProductConsumer} from './Context'
// import {Link} from 'react-router-dom'

// This will be used for pop-up banners

export default class Modal extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    // const {modalOpen, closeModal} = value;
                    // const {img, title, price} = value.modalProduct

                    // if (!modalOpen) {
                    //     return null;
                    // }
                    // else {
                    //     return (
                    //         <div>
                    //         </div>
                    //     )
                    // }
                }}
            </ProductConsumer>
        )
    }
}
