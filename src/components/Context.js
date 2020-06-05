import React, { Component } from "react";
import { storeProducts, detailProduct } from "../data";
import { toast } from "react-toastify";
import _ from "lodash";

const ProductContext = React.createContext();

const SET_CART = "SET_CART";
const CLEAR_CART = "CLEAR_CART";
const LOAD_CART = "LOAD_CART";
const SET_COUPON = "SET_COUPON";

const reducer = (action) => (state, props) => {
  const calc = (cartItems, voucher) => {
    cartItems.forEach((cartItem) => {
      cartItem.total = cartItem.count * cartItem.price;
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
      } else if (voucher.discount.type === "AMOUNT") {
        const discountAmount = voucher.discount.amount_off / 100;
        cartTotalAfterPromotion = cartTotal - discountAmount;
        discountedAmount = discountAmount;
      }

      if (cartTotalAfterPromotion < 0) {
        cartTotalAfterPromotion = 0;
        discountedAmount = cartTotal;
      }
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("discountedAmount", JSON.stringify(discountedAmount));
    localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
    localStorage.setItem(
      "cartTotalAfterPromotion",
      JSON.stringify(cartTotalAfterPromotion)
    );
    localStorage.setItem("appliedVoucher", JSON.stringify(voucher));

    console.log(cartItems);
    return {
      cart: cartItems,
      discountedAmount,
      cartTotal,
      cartTotalAfterPromotion,
      appliedVoucher: voucher,
    };
  };

  const readValueFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (e) {}
    }
  };

  const loadItemsFromLocalStorage = () => {
    return {
      cart: readValueFromLocalStorage("cart") || [],
      discountedAmount: readValueFromLocalStorage("discountedAmount") || 0,
      cartTotal: readValueFromLocalStorage("cartTotal") || 0,
      cartTotalAfterPromotion:
        readValueFromLocalStorage("cartTotalAfterPromotion") || 0,
      appliedVoucher: readValueFromLocalStorage("appliedVoucher") || {},
    };
  };

  switch (action.type) {
    case SET_COUPON:
      return calc(state.cart, action.appliedVoucher);
    case SET_CART:
      return calc(action.cart, state.appliedVoucher);
    case CLEAR_CART:
      return calc([], null);
    case LOAD_CART:
      return loadItemsFromLocalStorage();
    default:
      return null;
  }
};

class ProductProvider extends Component {
  state = {
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartTotal: 0,
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
    this.dispatch(LOAD_CART);
  }

  getItem = (id) => {
    const product = _.cloneDeep(storeProducts.find((item) => item.id === id));
    return product;
  };

  addToCart = (id, qt) => {
    const product = this.getItem(id);
    const quantity = parseInt(qt, 10);
    this.dispatch(SET_CART, {
      cart: [
        ...this.state.cart,
        {
          ...product,
          count: quantity,
          total: product.price,
        },
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
    if (tempCart.length === 0) {
      this.clearCart();
    } else {
      this.dispatch(SET_CART, {
        cart: tempCart,
      });
    }
  };

  clearCart = () => {
    this.dispatch(CLEAR_CART);
    toast.success("Cart cleared");
  };

  addPromotionToCart = async (couponCode, customer) => {
    // console.log("tset")
    console.log(couponCode);

    try {
      const prepareItemsPayload = (item) => {
        return {
          product_id: item.id,
          quantity: item.count,
          price: item.price * 100,
          amount: item.total * 100,
        };
      };

      const redemptionPayload = {
        code: couponCode,
        customer,
        amount: this.state.cartTotalAfterPromotion * 100,
        items: this.state.cart.map(prepareItemsPayload),
      };

      console.log(redemptionPayload);
      const voucher = await new Promise((resolve, reject) => {
        window.Voucherify.validate(redemptionPayload, (response) => {
          if (response.valid) {
            console.log(response);
            resolve(response);
          } else {
            console.log(response);
            toast.error(response.error.message);
            reject(new Error(response.reason));
          }
        });
      });
      this.dispatch(SET_COUPON, {
        appliedVoucher: voucher,
      });

      toast.success("Promotion applied");
    } catch (e) {
      console.error(e);
    }
  };

  checkoutCart = async (customer = {}) => {
    // If voucher is not applied
    if (_.isEmpty(this.state.appliedVoucher)) {
      this.dispatch(CLEAR_CART);
      toast.success("Payment successful");
      return;
    }
    // If voucher is applied
    try {
      const prepareItemsPayload = (item) => {
        return {
          product_id: item.id,
          quantity: item.count,
          price: item.price * 100,
          amount: item.total * 100,
        };
      };
      const redemptionPayload = {
        customer,
        order: {
          amount: this.state.cartTotalAfterPromotion * 100,
          items: this.state.cart.map(prepareItemsPayload),
        },
      };
      const code = this.state.appliedVoucher.code;
      await new Promise((resolve, reject) => {
        window.Voucherify.redeem(code, redemptionPayload, (response) => {
          if (response.result === "SUCCESS") {
            resolve(response);
          } else {
            reject(new Error(response.message));
          }
        });
      });
      this.dispatch(CLEAR_CART);
      toast.success("Payment successful");
    } catch (e) {
      console.error(e);
      toast.error("There was a problem with your purchase");
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
          getItem: this.getItem,
          checkoutCart: this.checkoutCart,
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
