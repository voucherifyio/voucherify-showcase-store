import React, { Component } from "react";
import { storeProducts, detailProduct } from "../data";
import { toast } from "react-toastify";
import _ from "lodash";

const ProductContext = React.createContext();

const SET_CART = "SET_CART";
const CLEAR_CART = "CLEAR_CART";
const SET_COUPON = "SET_COUPON";

let products = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });

const reducer = (action) => (state, props) => {
  const calc = (cartItems, voucher) => {
   cartItems.forEach(cartItem => {
      cartItem.total = cartItem.count * cartItem.price
    });
    
    const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
    let discountedAmount = 0;
    let cartTotalAfterPromotion = cartTotal;

    if (!_.isEmpty(voucher)) {
      if (voucher.discount.type === "PERCENT") {
        const discountAmount = voucher.discount.percent_off;
        cartTotalAfterPromotion =
          cartTotal - cartTotal * (discountAmount / 100);
        discountedAmount = cartTotal * (discountAmount / 100);
        console.log(discountAmount);
      } else if (voucher.discount.type === "AMOUNT") {
        console.log(voucher)
        const discountAmount = (voucher.discount.amount_off / 100);
        cartTotalAfterPromotion = cartTotal - discountAmount;
        discountedAmount = discountAmount;
      }
    }
    return {
      cart: cartItems,
      discountedAmount,
      cartTotal,
      cartTotalAfterPromotion,
      appliedVoucher: voucher,
    }
  };

  switch (action.type) {
    case SET_COUPON:
      return calc(state.cart, action.appliedVoucher);
    case SET_CART:
      return calc(action.cart, state.appliedVoucher); 
    case CLEAR_CART:
      return calc([], null)
    default:
      return null;
  }
};

class ProductProvider extends Component {
  state = {
    products: products,
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartTotal: 0,
    cartDiscount: {},
    cartTotalAfterPromotion: 0,
    appliedVoucher: {},
    discountedAmount: 0,
  };

  dispatch = (type, data) => {
    this.setState(
      reducer({
        type,
        ...data,
      })
    );
  };

  componentDidMount() {
    // this.setProducts();
  }

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => ({
      detailProduct: product,
    }));
  };

  addToCart = (id) => {
    const product = this.getItem(id);
    this.dispatch(SET_CART, {
      cart: [
        ...this.state.cart,
        {
          ...product,
          count: 1,
          total: product.price
        }
      ],
    });
    toast.success("Item added to cart");
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => ({
      modalProduct: product,
      modalOpen: true,
    }));
  };

  closeModal = () => {
    this.setState(() => ({
      modalOpen: false,
    }));
  };

  increment = (id) => {
    const tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    selectedProduct.count = selectedProduct.count + 1;
    this.dispatch(SET_CART, {
      cart: tempCart,
    });
  };

  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    selectedProduct.count = selectedProduct.count - 1;

    if (selectedProduct.count === 0) {
      this.removeItem(id);
    } else {
      this.dispatch(SET_CART, {
        cart: tempCart,
      });
    }
  };

  removeItem = (id) => {
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter((item) => item.id !== id);

    this.dispatch(SET_CART, {
      cart: tempCart,
    });
  };

  clearCart = () => {
    this.dispatch(CLEAR_CART);
    toast.success("Cart cleared");
  };

  addPromotionToCart = async (couponCode) => {
    try {
      const voucher = await new Promise((resolve, reject) => {
        window.Voucherify.validate(couponCode, (response) => {
          if (response.valid) {
            resolve(response);
          } else {
            reject(new Error(response.reason));
          }
        });
      });

      this.dispatch(SET_COUPON, {
        appliedVoucher: voucher,
      });
      toast.success("Promotion applied");
    } catch (e) {
      toast.error("Promotion not found");
    }
  };

  removePromotionFromCart = () => {
    this.dispatch(SET_COUPON, {
      appliedVoucher: null,
    });
  };

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
          removePromotionFromCart: this.removePromotionFromCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
