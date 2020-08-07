import React, { Component } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';
import storeCustomers from '../../storeCustomers.json';

const ProductContext = React.createContext();

const SET_CART = 'SET_CART';
const CLEAR_CART = 'CLEAR_CART';
const LOAD_CART = 'LOAD_CART';
const SET_COUPON = 'SET_COUPON';

const reducer = (action) => (state, props) => {
  const calc = (cartItems, cartSelectedVoucher) => {
    cartItems.forEach((cartItem) => {
      cartItem.total = cartItem.count * cartItem.price;
    });

    const cartTotal = cartItems.reduce(
      (sum, item) => sum + item.total,
      0
    );
    let cartDiscountedAmount = 0;
    let cartTotalAfterPromotion = cartTotal;

    if (!_.isEmpty(cartSelectedVoucher)) {
      if (_.has(cartSelectedVoucher, 'applicable_to')) {
        const applicableProducts = [];
        let applicableProductInCart = '';
        cartSelectedVoucher.applicable_to.data.map((e) => applicableProducts.push(e.id));
        for (let i = 0; i < applicableProducts.length; i++) {
          applicableProductInCart = cartItems.find(
            (item) => item.id === applicableProducts[i]
          );
        }
        if (cartSelectedVoucher.discount.type === 'PERCENT') {
          const discountAmount = cartSelectedVoucher.discount.percent_off;
          cartTotalAfterPromotion =
            cartTotal -
            applicableProductInCart.price * (discountAmount / 100);
          cartDiscountedAmount =
            applicableProductInCart.price * (discountAmount / 100);
        } else if (cartSelectedVoucher.discount.type === 'AMOUNT') {
          const discountAmount = cartSelectedVoucher.discount.amount_off;
          cartTotalAfterPromotion =
            applicableProductInCart.total - discountAmount;
          cartDiscountedAmount = discountAmount;
        }
      } else if (cartSelectedVoucher.discount.type === 'PERCENT') {
        const discountAmount = cartSelectedVoucher.discount.percent_off;
        cartTotalAfterPromotion =
          cartTotal - cartTotal * (discountAmount / 100);
        cartDiscountedAmount = cartTotal * (discountAmount / 100);
      } else if (cartSelectedVoucher.discount.type === 'AMOUNT') {
        const discountAmount = cartSelectedVoucher.discount.amount_off;
        cartTotalAfterPromotion = cartTotal - discountAmount;
        cartDiscountedAmount = discountAmount;
      }

      if (cartTotalAfterPromotion < 0) {
        cartTotalAfterPromotion = 0;
        cartDiscountedAmount = cartTotal;
      }
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem(
      'cartDiscountedAmount',
      JSON.stringify(cartDiscountedAmount)
    );
    localStorage.setItem(
      'cartTotal',
      JSON.stringify(cartTotal)
    );
    localStorage.setItem(
      'cartTotalAfterPromotion',
      JSON.stringify(cartTotalAfterPromotion)
    );
    localStorage.setItem('cartSelectedVoucher', JSON.stringify(cartSelectedVoucher));

    return {
      cartItems,
      cartDiscountedAmount,
      cartTotal,
      cartTotalAfterPromotion,
      cartSelectedVoucher,
    };
  };

  const readValueFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        console.log('[readValueFromLocalStorage]', e)
      }
    }
  };

  const loadItemsFromLocalStorage = () => {
    return {
      cartItems: readValueFromLocalStorage('cartItems') || [],
      cartDiscountedAmount:
        readValueFromLocalStorage('cartDiscountedAmount') || 0,
      cartTotal: readValueFromLocalStorage('cartTotal') || 0,
      cartTotalAfterPromotion:
        readValueFromLocalStorage('cartTotalAfterPromotion') || 0,
      cartSelectedVoucher:
        readValueFromLocalStorage('cartSelectedVoucher') || null,
      cartOrderId: readValueFromLocalStorage('cartOrderId') || null,
      storeProducts: readValueFromLocalStorage('storeProducts') || [],
      customerSelectedCustomer:
        readValueFromLocalStorage('customerSelectedCustomer') || null,
      fetchingCustomer:
        readValueFromLocalStorage('fetchingCustomer') || false,
      customerPublishedCodes:
        readValueFromLocalStorage('customerPublishedCodes') || null,
      customerVouchers:
        readValueFromLocalStorage('customerVouchers') || null,
      customerCampaigns:
        readValueFromLocalStorage('customerCampaigns') || null,
      customerQualifications: 
        readValueFromLocalStorage('customerQualifications') || null,
      storeSessionId:
        readValueFromLocalStorage('storeSessionId') || null,
    };
  };

  switch (action.type) {
    case SET_COUPON:
      return calc(state.cartItems, action.cartSelectedVoucher);
    case SET_CART:
      return calc(action.cartItems, state.cartSelectedVoucher);
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
    cartItems: [],
    cartTotal: 0,
    cartTotalAfterPromotion: 0,
    cartSelectedVoucher: null,
    cartDiscountedAmount: 0,
    cartOrderId: null,
    customerSelectedCustomer: null,
    customerAvailableCustomers: null,
    customerPublishedCodes: null,
    customerCampaigns: null,
    customerVouchers: null,
    customerQualifications: null,
    storeSidebar: true,
    storeProducts: [],
    storeSessionId: null,
    fetchingCampaigns: true,
    fetchingProducts: true,
    fetchingCustomer: true,
    fetchingQualifications: false,
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
    this.init();
    this.loadProducts();
  }

  init = async () => {
    try {
      const session = await fetch(
        `${process.env.REACT_APP_API_URL || ''}/init`,
        {
          credentials: 'include',
        }
      ).then((response) => response.json());
      if (session.coupons.length === 0) {
        this.setState({
          storeSessionId: session.session,
          customerPublishedCodes: JSON.parse(
            localStorage.getItem('customerPublishedCodes')
          ),
        });
      } else {
        this.setState({
          storeSessionId: session.session,
          customerPublishedCodes: session.coupons,
        });
        localStorage.setItem(
          'storeSessionId',
          JSON.stringify(this.state.storeSessionId)
        );
        localStorage.setItem(
          'customerPublishedCodes',
          JSON.stringify(this.state.customerPublishedCodes)
        );
      }
      await this.getCustomers();
      await this.getCampaigns();
      await this.getVouchers();
    } catch (e) {
      console.log('[Init]', e);
    }
  };

  getCustomers = async () => {
    try {
      this.setState({ fetchingCustomer: true});
      const customerAvailableCustomers = await Promise.all(
        storeCustomers.map(async (customer) => {
          const cust = await fetch(
            `${process.env.REACT_APP_API_URL || ''}/customer/${
              this.state.storeSessionId
            }${customer.source_id}`,
            {
              include: 'credentials',
            }
          );
          return await cust.json();
        })
      );
      this.setState({
        customerAvailableCustomers: customerAvailableCustomers,
        fetchingCustomer: false,
      });
      localStorage.setItem(
        'customerAvailableCustomers',
        JSON.stringify(customerAvailableCustomers)
      );

      //Check current customer for errors
      const customerSelectedCustomer = JSON.parse(
        localStorage.getItem('customerSelectedCustomer')
      );

      //If there is an error with current selected customer -> set customer to null and hide campaigns

      if (
        !_.map(customerAvailableCustomers, 'source_id', []).includes(
          _.get(customerSelectedCustomer, 'source_id')
        )
      ) {
        this.setState({
          customerSelectedCustomer: null,
          fetchingCampaigns: true,
        });
        localStorage.setItem('customerSelectedCustomer', null);
      }
    } catch (e) {
      console.log('[getCustomers]', e);
    }
  };

  getCampaigns = async () => {
    try {
      this.setState({ fetchingCampaigns: true});
      const customerCampaigns = await fetch(
        `${process.env.REACT_APP_API_URL || ''}/campaigns`,
        {
          include: 'credentials',
        }
      ).then((camps) => camps.json());

      customerCampaigns.forEach((camps) => {
        camps.coupons = []
        this.state.customerPublishedCodes.forEach((code) => {
          code.campaigns.forEach((camp) => {
            if (camp.campaign === camps.name) {
              camps.coupons.push({customerSelectedCustomer: code.customerSelectedCustomer, customerDataCoupon: camp.code})
            }
          })
         
        })
      })

      this.setState({
        customerCampaigns: customerCampaigns,
        fetchingCampaigns: false,
      });

      localStorage.setItem(
        'customerCampaigns',
        JSON.stringify(customerCampaigns)
      );
    } catch (e) {
      console.log('[getCampaigns]', e);
    }
  };

  // Simple sleep function for fetching data
  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  getVouchers = async () => {
    try {
      this.setState({ fetchingCampaigns: true});
      const customerVouchers = await fetch(
        `${process.env.REACT_APP_API_URL || ''}/vouchers`,
        {
          include: 'credentials',
        }
      ).then((resp) => resp.json());

      this.setState({
        customerVouchers: customerVouchers,
        fetchingCampaigns: false,
        fetchingQualifications: false,
      });

      localStorage.setItem(
        'customerVouchers',
        JSON.stringify(customerVouchers)
      );
    } catch (e) {
      console.log('[getVouchers]', e);
    }
  };

  loadProducts = async () => {
    try {
      const storeProducts = await fetch(
        `${process.env.REACT_APP_API_URL || ''}/products`,
        {
          credentials: 'include',
        }
      ).then((response) => response.json());
      this.setState({
        storeProducts: storeProducts,
        fetchingProducts: false,
      });
      localStorage.setItem(
        'storeProducts',
        JSON.stringify(storeProducts)
      );
    } catch (e) {
      console.log('[loadProducts]', e);
    }
  };

  getCustomer = async (id) => {
    try {
      // Get customer data, start spinner
      this.setState({ fetchingCustomer: true, customerQualifications: null});
      const customerSelectedCustomer = await fetch(
        `${process.env.REACT_APP_API_URL || ''}/customer/${id}`,
        {
          credentials: 'include',
        }
      ).then((x) => x.json());
      this.setState({
        customerSelectedCustomer: customerSelectedCustomer,
        fetchingCustomer: false,
      });
      localStorage.setItem(
        'customerSelectedCustomer',
        JSON.stringify(customerSelectedCustomer)
      );
      localStorage.setItem(
        'fetchingCustomer',
        JSON.stringify(false)
      );
      localStorage.setItem(
        'customerQualifications',
        JSON.stringify(null)
      );
    } catch (e) {
      console.log('[getCustomer]', e);
    }
  };

  updateCustomerData = async (id) => {
    try {
      // Get customer data, start spinner
      this.setState({
        fetchingCustomer: true,
        fetchingCampaigns: true,
        fetchingQualifications: true,
      });
      const customer = await fetch(
        `${process.env.REACT_APP_API_URL || ''}/customer/${id}`,
        {
          credentials: 'include',
        }
      ).then((x) => x.json());
      // Check if customer data has not updated
      if (
        customer.summary.orders.total_amount ===
        this.state.customerSelectedCustomer.summary.orders.total_amount
      ) {
        // If true -> wait
        await this.sleep(5000);
        await this.updateCustomerData(id);
      } else {
        await this.getCustomer(id);
        await this.getCampaigns();
        await this.getVouchers();
      }
    } catch (e) {
      console.log('[updateCustomerData]', e);
    }
  };

  getItem = (id) => {
    const tempProducts = this.state.storeProducts;
    const product = _.cloneDeep(tempProducts.find((item) => item.id === id));
    return product;
  };

  addToCart = (id, qt) => {
    const product = this.getItem(id);
    const quantity = parseInt(qt, 10);
    const cartItems = [...this.state.cartItems];
    const item = _.cloneDeep(cartItems.find((item) => item.id === id));
    if (item) {
      const selectedProduct = cartItems.find((item) => item.id === id);
      selectedProduct.count = selectedProduct.count + quantity;
      this.dispatch(SET_CART, { cartItems: cartItems });
    } else {
      this.dispatch(SET_CART, {
        cartItems: [
          ...cartItems,
          {
            ...product,
            count: quantity,
            total: product.price * quantity * 100,
          },
        ],
      });
    }
    // Coupon revalidation logic
    if (this.state.cartSelectedVoucher) {
      this.removePromotionFromCart();
    }
  };

  increment = (id, qt) => {
    const selectedProduct = this.state.cartItems.find(
      (item) => item.id === id
    );
    selectedProduct.count = qt;
    selectedProduct.total = selectedProduct.price * qt;
    this.dispatch(SET_CART, {
      cartItems: this.state.cartItems,
    });
    // Coupon revalidation logic
    if (this.state.cartSelectedVoucher) {
      this.removePromotionFromCart();
    }
  };

  removeItem = (id) => {
    const updatedCart = this.state.cartItems.filter(
      (item) => item.id !== id
    );
    if (updatedCart.length === 0) {
      this.clearCart();
    } else {
      this.dispatch(SET_CART, { cartItems: updatedCart });
    }
    // Coupon revalidation logic
    if (this.state.cartSelectedVoucher) {
      this.removePromotionFromCart();
    }
  };

  clearCart = () => {
    this.dispatch(CLEAR_CART);
    toast.success('Cart cleared');
  };

  prepareItemsPayload = (item) => {
    return {
      product_id: item.id,
      quantity: item.count,
      price: item.price,
      amount: item.total,
    };
  };
  
  addPromotionToCart = async (couponCode) => {
    try {
      const customer = this.state.customerSelectedCustomer
      

      const redemptionPayload = {
        code: couponCode,
        customer: { id: customer.id, source_id: customer.source_id },
        amount: this.state.cartTotal,
        items: this.state.cartItems.map(this.prepareItemsPayload),
      };

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
        // NOTE: we cache `customer` in cartSelectedVoucher
        // object for the sake of coupon revalidation on cart changes
        cartSelectedVoucher: { ...voucher, customer },
      });
      toast.success('Coupon applied');
    } catch (e) {
      console.log('[addPromotionToCart]', e);
      this.removePromotionFromCart();
    }
  };

  getQualifications = async (customerSelectedCustomer, cartTotal, cartItems) => {
    this.setState({fetchingQualifications: true})
    
    const qtPayload = {
      customer: { id: customerSelectedCustomer.id },
      order: {
        amount: cartTotal,
        items: cartItems.map(this.prepareItemsPayload),
      }
    };

    console.log(qtPayload)
    
    const customerQualifications = await fetch(
      `${process.env.REACT_APP_API_URL || ''}/qualifications`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(qtPayload),
      }
    ).then((resp) => resp.json())

    // const customerQualifications = await qualifications

    this.setState({
      customerQualifications: customerQualifications, 
      fetchingQualifications: false,
    });
    localStorage.setItem(
      'customerQualifications',
      JSON.stringify(customerQualifications)
    );
  };

  sendOrder = async (orderPayload) => {
    const order = await fetch(`${process.env.REACT_APP_API_URL || ''}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(orderPayload),
    });
    return order.json();
  };

  sendRedemption = async (redemptionPayload) => {
    const redemption = await fetch(
      `${process.env.REACT_APP_API_URL || ''}/redeem`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(redemptionPayload),
      }
    );
    return redemption.json();
  };

  checkoutCart = async (customer = {}) => {
    const id = () => {
      return 'hot_beans_' + Math.random().toString(36).substr(2, 20);
    };

  

    // If voucher is not applied
    if (_.isEmpty(this.state.cartSelectedVoucher)) {
      const orderPayload = {
        source_id: id(),
        items: this.state.cartItems.map(this.prepareItemsPayload),
        amount: this.state.cartTotal,
        customer,
        status: 'FULFILLED',
      };
      await this.sendOrder(orderPayload).catch((err) => {
        toast.error('There was a problem with your purchase');
        console.log(err);
      });
      this.dispatch(CLEAR_CART);
      toast.success('Payment successful');
      this.setState({
        cartOrderId: orderPayload.source_id,
      });
      localStorage.setItem(
        'cartOrderId',
        JSON.stringify(orderPayload.source_id)
      );
      // If voucher is applied
    } else {
      try {
        const code = this.state.cartSelectedVoucher.code;

        const redemptionPayload = {
          code,
          customer,
          order: {
            source_id: id(),
            amount: this.state.cartTotal,
            items: this.state.cartItems.map(this.prepareItemsPayload),
          },
        };

        await this.sendRedemption(redemptionPayload).catch((err) => {
          console.error(err);
        });
        this.dispatch(CLEAR_CART);
        toast.success('Payment successful');
        this.setState({
          cartOrderId: redemptionPayload.order.source_id,
        });
        localStorage.setItem(
          'cartOrderId',
          JSON.stringify(redemptionPayload.order.source_id)
        );
      } catch (e) {
        console.log('[checkoutCart]', e);
        toast.error('There was a problem with your purchase');
      }
    }
  };

  removePromotionFromCart = () => {
    this.dispatch(SET_COUPON, {
      cartSelectedVoucher: null,
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
          getCustomer: this.getCustomer,
          getCustomers: this.getCustomers,
          getRedemptions: this.getRedemptions,
          updateCustomerData: this.updateCustomerData,
          getCampaigns: this.getCampaigns,
          getVouchers: this.getVouchers,
          setVoucherOrCampaign: this.setVoucherOrCampaign,
          getQualifications: this.getQualifications,
          prepareItemsPayload: this.prepareItemsPayload
        }}
      >
        {/* eslint-disable-next-line react/prop-types */}
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
