import React, { Component } from 'react';
import { storeProducts, detailProduct } from '../data';
import { toast } from 'react-toastify';

const ProductContext = React.createContext();

const addPromotion = 'ADD_PROMOTION';

const reducer = (action) => (state, props) => {
  switch (action.type) {
    case addPromotion:
      console.log(state.cartDiscount);

      if (state.cartDiscount !== []) {
        if (state.cartDiscount[1] === 'percent') {
          return {
            cartTotalAfterPromotion:
              state.cartTotal - state.cartTotal * state.cartDiscount[0],
            discounted: state.cartTotal * state.cartDiscount[0],
          };
        } else if (state.cartDiscount[1] === 'amount') {
          return {
            cartTotalAfterPromotion: state.cartTotal - state.cartDiscount[0],
            discounted: state.cartDiscount[0],
          };
        }
      }

      if (state.cartDiscount === [])
        return {
          cartTotalAfterPromotion: state.cartTotal + 0,
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
    cartSubTotal: 0,
    cartTotal: 0,
    cartDiscount: [],
    cartTotalAfterPromotion: 0,
    appliedVoucher: {},
    discounted: 0,
  };

  addPromotion = () => {
    this.setState(
      reducer({
        type: addPromotion,
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
        toast.success('Item added to cart');
        this.addTotals();
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
        this.addTotals();
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
          this.addTotals();
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
        this.addTotals();
      }
    );
  };

  clearCart = () => {
    this.setState(
      () => {
        return {
          cart: [],
          cartDiscount: 0,
          cartTotalAfterPromotion: 0,
          appliedVoucher: {},
        };
      },
      () => {
        toast.success('Cart cleared');
        this.setProducts();
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const total = subTotal;

    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTotal: total,
      };
    });
    this.addPromotion();
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
          toast.success('Promotion applied');
          this.checkDiscount();
          this.addPromotion();
        }
      );
    } catch (e) {
      toast.error('Promotion not found');
    }
  };

  removePromotionFromCart = () => {
    this.setState(
      () => {
        return {
          appliedVoucher: {},
          cartTotalAfterPromotion: 0,
        };
      },
      () => {
        toast.success('Promotion removed');
      }
    );
  };

  checkDiscount = () => {
    const voucher = this.state.appliedVoucher;
    let cartDiscount = [];

    if (voucher.discount.type === 'PERCENT') {
      cartDiscount = [
        parseInt(voucher.discount.percent_off, 10) / 100,
        'percent',
      ];
    } else if (voucher.discount.type === 'AMOUNT') {
      cartDiscount = [parseInt(voucher.discount.amount, 10), 'amount'];
    } else if (voucher.discount.type === 'UNIT') {
      console.log('Mega unit');
    }

    this.setState(() => {
      return {
        cartDiscount: cartDiscount,
      };
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
        }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
