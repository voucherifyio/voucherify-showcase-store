import React, { Component } from "react";
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

    let cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
    console.log(cartTotal);
    let discountedAmount = 0;
    let cartTotalAfterPromotion = cartTotal;

    if (!_.isEmpty(voucher)) {
      if (_.has(voucher, "applicable_to")) {
        let applicableProducts = [];
        let applicableProductInCart = "";
        voucher.applicable_to.data.map((e) => applicableProducts.push(e.id));
        for (let i = 0; i < applicableProducts.length; i++) {
          applicableProductInCart = cartItems.find(
            (item) => item.id === applicableProducts[i]
          );
        }
        if (voucher.discount.type === "PERCENT") {
          const discountAmount = voucher.discount.percent_off;
          cartTotalAfterPromotion =
            cartTotal - applicableProductInCart.total * (discountAmount / 100);
          discountedAmount =
            applicableProductInCart.total * (discountAmount / 100);
        } else if (voucher.discount.type === "AMOUNT") {
          const discountAmount = voucher.discount.amount_off;
          cartTotalAfterPromotion =
            applicableProductInCart.total - discountAmount;
          discountedAmount = discountAmount;
        }
      } else if (voucher.discount.type === "PERCENT") {
        const discountAmount = voucher.discount.percent_off;
        cartTotalAfterPromotion =
          cartTotal - cartTotal * (discountAmount / 100);
        discountedAmount = cartTotal * (discountAmount / 100);
      } else if (voucher.discount.type === "AMOUNT") {
        const discountAmount = voucher.discount.amount_off;
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

    console.log("Cart Payload");
    console.log({
      amount: cartTotal,
      items: cartItems,
    });

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
      appliedVoucher: readValueFromLocalStorage("appliedVoucher") || null,
      products: readValueFromLocalStorage("products") | [],
      lastOrderID: readValueFromLocalStorage("lastOrderID") | null,
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
    cartTotal: 0,
    cartTotalAfterPromotion: 0,
    appliedVoucher: null,
    discountedAmount: 0,
    products: [],
    fetchingProducts: true,
    lastOrderID: null,
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
    this.loadProducts();
  }

  loadProducts = async () => {
    try {
      const products = await fetch(
        `${process.env.REACT_APP_API_URL}/products`,
        {
          credentials: "include",
        }
      ).then((response) => response.json());
      this.setState({
        products: products,
        fetchingProducts: false,
      });
      localStorage.setItem("products", JSON.stringify(products));
    } catch (e) {
      console.log(e);
    }
  };

  getItem = (id) => {
    const tempProducts = this.state.products;
    const product = _.cloneDeep(tempProducts.find((item) => item.id === id));
    return product;
  };

  addToCart = (id, qt) => {
    const product = this.getItem(id);
    const quantity = parseInt(qt, 10);
    const cart = [...this.state.cart];
    const item = _.cloneDeep(cart.find((item) => item.id === id));
    if (item) {
      const selectedProduct = cart.find((item) => item.id === id);
      selectedProduct.count = selectedProduct.count + quantity;
      this.dispatch(SET_CART, {
        cart: cart,
      });
    } else {
      this.dispatch(SET_CART, {
        cart: [
          ...cart,
          {
            ...product,
            count: quantity,
            total: product.price * quantity * 100,
          },
        ],
      });
    }
    // Coupon revalidation logic
    if (this.state.appliedVoucher) {
      console.log("Voucher applied. Item added - revalidate voucher");
      this.addPromotionToCart(
        this.state.appliedVoucher.code,
        this.state.appliedVoucher.customer
      );
    }
  };

  increment = (id, qt) => {
    // const tempCart = [...this.state.cart];
    const selectedProduct = this.state.cart.find((item) => item.id === id);
    selectedProduct.count = qt;
    selectedProduct.total = selectedProduct.price * qt
    this.dispatch(SET_CART, {
      cart: this.state.cart,
    });

    // Coupon revalidation logic
    if (this.state.appliedVoucher) {
      console.log(
        "Voucher applied. Item quantity changed - revalidate voucher"
      );
      console.log(this.state.cartTotal);
      this.addPromotionToCart(
        this.state.appliedVoucher.code,
        this.state.appliedVoucher.customer,
        this.state.cartTotal
      );
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

    // Coupon revalidation logic
    if (this.state.appliedVoucher) {
      console.log("Voucher applied. Item removed - revalidate voucher");
      this.addPromotionToCart(
        this.state.appliedVoucher.code,
        this.state.appliedVoucher.customer
      );
    }
  };

  clearCart = () => {
    this.dispatch(CLEAR_CART);
    toast.success("Cart cleared");
  };

  addPromotionToCart = async (couponCode, customer) => {
    try {
      const prepareItemsPayload = (item) => {
        return {
          source_id: item.id,
          product_id: item.id,
          quantity: item.count,
          price: item.price,
          amount: item.total,
        };
      };

      const redemptionPayload = {
        code: couponCode,
        customer,
        amount: this.state.cartTotal,
        items: this.state.cart.map(prepareItemsPayload),
      };

      console.log("Redemption Payload");
      console.log(redemptionPayload);

      const voucher = await new Promise((resolve, reject) => {
        window.Voucherify.setIdentity(customer.source_id);

        window.Voucherify.validate(redemptionPayload, (response) => {
          if (response.valid) {
            resolve(response);
          } else {
            if (response.error) {
              toast.error(response.error.message);
            } else {
              toast.error(response.reason);
            }
            reject(new Error(response.reason));
          }
        });
      });
      this.dispatch(SET_COUPON, {
        // NOTE: we cache `customer` in appliedVoucher object for the sake of coupon revalidation on cart changes
        appliedVoucher: { ...voucher, customer },
      });
      toast.success("Coupon applied");
    } catch (e) {
      console.log(e);
      this.removePromotionFromCart();
    }
  };

  sendOrder = async (orderPayload) => {
    const order = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(orderPayload),
    });
    return order.json();
  };

  sendRedemption = async (redemptionPayload) => {
    const redemption = await fetch(`${process.env.REACT_APP_API_URL}/redeem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(redemptionPayload),
    });
    return redemption.json();
  };

  checkoutCart = async (customer = {}) => {
    const ID = () => {
      return "hot_beans_" + Math.random().toString(36).substr(2, 20);
    };

    const prepareItemsPayload = (item) => {
      return {
        product_id: item.id,
        quantity: item.count,
        price: item.price * 100,
        amount: item.total * 100,
      };
    };

    // If voucher is not applied
    if (_.isEmpty(this.state.appliedVoucher)) {
      const orderPayload = {
        source_id: ID(),
        items: this.state.cart.map(prepareItemsPayload),
        amount: this.state.cartTotalAfterPromotion * 100,
        customer,
        status: "FULFILLED",
      };
      await this.sendOrder(orderPayload).catch((err) => {
        console.error(err);
      });
      this.dispatch(CLEAR_CART);
      toast.success("Payment successful");
      this.setState({
        lastOrderID: orderPayload.source_id,
      });
      localStorage.setItem(
        "lastOrderID",
        JSON.stringify(orderPayload.source_id)
      );
    }
    // If voucher is applied
    else {
      try {
        const code = this.state.appliedVoucher.code;

        const redemptionPayload = {
          code,
          customer,
          order: {
            source_id: ID(),
            amount: this.state.cartTotalAfterPromotion * 100,
            items: this.state.cart.map(prepareItemsPayload),
          },
        };

        await this.sendRedemption(redemptionPayload).catch((err) => {
          console.error(err);
        });
        this.dispatch(CLEAR_CART);
        toast.success("Payment successful");
        this.setState({
          lastOrderID: redemptionPayload.order.source_id,
        });
        localStorage.setItem(
          "lastOrderID",
          JSON.stringify(redemptionPayload.order.source_id)
        );
      } catch (e) {
        console.error(e);
        toast.error("There was a problem with your purchase");
      }
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
          increment: this.increment,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          getItem: this.getItem,
          checkoutCart: this.checkoutCart,
          addPromotionToCart: this.addPromotionToCart,
          removePromotionFromCart: this.removePromotionFromCart,
          loadProducts: this.loadProducts,
          prepareRedemptionPayload: this.prepareRedemptionPayload,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer, ProductContext };
