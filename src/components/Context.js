import React, { Component } from 'react'
import {storeProducts, detailProduct} from '../data'
import client from './Cart/VoucherifyContext'

const ProductContext = React.createContext()

class ProductProvider extends Component {
    
    state= {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        cartDiscount: 0,
        cartTotalAfterPromotion: 0,
        promotionItemsNumber: 0,
        promotionItems: {},
        couponCode: "",
    };
    
    componentDidMount() {
        this.setProducts();
    };

    setProducts = () => { 
        let tempProducts = [];

        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        });

        this.setState(() => {
            return {products:tempProducts}
        });

    };

    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product
    }

    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct:product}
        })
    }

    addToCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id))
        const product = tempProducts[index]
        product.inCart = true;
        product.count = 1
        const price = product.price
        product.total = price;

        this.setState(() => {
            return {
                products:tempProducts, 
                cart: [...this.state.cart, product]
            }
        }, 
        () => {
            this.addTotals();
        })
    }


    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {
                modalProduct: product,
                modalOpen: true,
            }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return {
                modalOpen: false,
            }
        })
    }

    increment = id => {
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]

        product.count = product.count + 1
        product.total = product.count * product.price

        this.setState(() => {return {cart: [...tempCart]}}, () => {this.addTotals()})
    }

    decrement = id => {
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]

        product.count = product.count -1

        if (product.count === 0) {
            this.removeItem(id)
        } else {
            product.total = product.count * product.price
            this.setState(() => {return {cart: [...tempCart]}}, () => {this.addTotals()})

        }
    }

    removeItem = id => {
        let tempProducts = [...this.state.products]
        let tempCart = [...this.state.cart]

        tempCart = tempCart.filter(item => item.id !== id)

        const index = tempProducts.indexOf(this.getItem(id))

        let removedProduct = tempProducts[index]

        removedProduct.inCart = false
        removedProduct.count = 0
        removedProduct.total = 0

        this.setState(() => {
            return {
                cart:[...tempCart],
                products:[...tempProducts]
            }
        }, () => {
            this.addTotals()
        })
    }

    clearCart = () => {
        this.setState(() => {
            return {
                cart:[],
                cartDiscount: 0,
                cartTotalAfterPromotion: 0,
                promotionItemsNumber: 0,
                promotionItems: {},
            }
        }, () => {
            this.setProducts();
            this.addTotals();
        })
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => subTotal += item.total)
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2))
        const total = subTotal + tax
        this.setState(() => {
            return {
                cartSubTotal:subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    addPromotionToCart = couponCode => {

        client.vouchers.get(couponCode, (error, result) => {
            if (error) {
                return error
            }
            const promotion2 = result
            console.log(promotion2)
            this.setState(() => {
                return {
                    promotionItems: promotion2,
                    promotionItemsNumber: 1
                }
            }, 
            () => {
                this.countDiscount();
            })
        })
    }

    countDiscount = () => {

        const voucher = this.state.promotionItems
        const actualCartSubTotal = parseInt(this.state.cartSubTotal,10)
        const cartTax = this.state.cartTax
        let voucherDiscount = 0
        let cartDiscount = 0

        if (voucher.discount.type === "PERCENT") {
            voucherDiscount = parseInt(voucher.discount.percent_off, 10)/100
            cartDiscount = actualCartSubTotal * (1 - voucherDiscount)

        } else if (voucher.discount.type === "AMOUNT") {
            voucherDiscount = parseInt(voucher.discount.amount, 10)
            cartDiscount = actualCartSubTotal - voucherDiscount

        } else if (voucher.discount.type === "UNIT") {
            console.log("Mega unit")

        }

            let cartTotalAfterPromotion = actualCartSubTotal - cartDiscount + cartTax

            this.setState(() => {
                return {
                    cartDiscount: cartDiscount,
                    cartTotalAfterPromotion: cartTotalAfterPromotion
                }
            })

        }
    
    // getCouponCode = (value) => {
    //     this.setState ( {
    //         couponCode: value
    //     })

    //     console.log(this.state.couponCode)
    // }

    render() {
        return (
            <ProductContext.Provider
                value={{
                    ...this.state, 
                    handleDetail: this.handleDetail, 
                    addToCart: this.addToCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart,
                    addPromotionToCart: this.addPromotionToCart,
                    // getCouponCode: this.getCouponCode,
                }}
            >
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};