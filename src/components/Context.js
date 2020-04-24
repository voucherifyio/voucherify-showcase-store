import React, { Component } from "react";
import { storeProducts, detailProduct } from "../data";
import { toast } from "react-toastify";
import _ from "lodash";

const ProductContext = React.createContext();

const REMOVE_PROMOTION = "REMOVE_PROMOTION";
const SET_CART = "SET_CART";
const CLEAR_CART = "CLEAR_CART";

const reducer = (action) => (state, props) => {
  switch (action.type) {
    case SET_CART:
      let discountedAmount = 0;
      let tempTotal = 0;
      const cartTotal = state.cart.map((item) => (tempTotal += item.total));
      let cartTotalAfterPromotion = cartTotal;

      if (!_.isEmpty(state.appliedVoucher)) {
        if (state.appliedVoucher.discount.type === "PERCENT") {
          const discountAmount = state.appliedVoucher.discount.percent_off;
          cartTotalAfterPromotion =
            cartTotal - cartTotal * (discountAmount / 100);
          discountedAmount = cartTotal * (discountAmount / 100);
          console.log(discountAmount);
        } else if (state.appliedVoucher.discount.type === "AMOUNT") {
          const discountAmount = state.appliedVoucher.discount.amount;
          cartTotalAfterPromotion = cartTotal - discountAmount;
          discountedAmount = discountAmount;
        }
      }

      return {
        cartTotalAfterPromotion: cartTotalAfterPromotion,
        discountedAmount: discountedAmount,
        cartTotal: cartTotal,
      };

    case REMOVE_PROMOTION:
      return {
        appliedVoucher: {},
        cartTotalAfterPromotion: state.cartTotal,
      };

    case CLEAR_CART:
      return {
        cart: [],
        cartDiscount: 0,
        cartTotalAfterPromotion: 0,
        appliedVoucher: {},
      };

    default:
      return null;
  }
};

class ProductProvider extends Component {
  state = {
    products: [],
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

  dispatch = (type) => {
    this.setState(
      reducer({
        type: type,
      })
    );
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];

    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });

    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = (id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(
      () => {
        return {
          products: tempProducts,
          cart: [...this.state.cart, product],
        };
      },
      () => {
        toast.success("Item added to cart");
        this.dispatch("SET_CART");
      }
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return {
        modalProduct: product,
        modalOpen: true,
      };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return {
        modalOpen: false,
      };
    });
  };

  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.dispatch("SET_CART");
      }
    );
  };

  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;

    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.dispatch("SET_CART");
        }
      );
    }
  };

  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter((item) => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));

    let removedProduct = tempProducts[index];

    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts],
        };
      },
      () => {
        this.dispatch("SET_CART");
      }
    );
  };

  clearCart = () => {
    this.dispatch("CLEAR_CART");
    toast.success("Cart cleared");
    this.setProducts();
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

      this.setState(
        () => {
          return {
            appliedVoucher: voucher,
          };
        },
        () => {
          toast.success("Promotion applied");
          this.dispatch("SET_CART");
        }
      );
    } catch (e) {
      toast.error("Promotion not found");
    }
  };

  removePromotionFromCart = () => {
    this.dispatch("REMOVE_PROMOTION");
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
