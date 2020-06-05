import React, { Component } from "react";
import storeCustomers from "../storeCustomers.json";

const CustomerContext = React.createContext();

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
    customer: readValueFromLocalStorage("customer") || null,
    fetchingCustomer: readValueFromLocalStorage("fetchingCustomer") || false,
    customerRedemptions:
      readValueFromLocalStorage("customerRedemptions") || null,
    publishedVouchers: readValueFromLocalStorage("publishedVouchers") || null,
  };
};

class CustomerProvider extends Component {
  state = {
    customer: null,
    sidebar: true,
    customers: [],
    fetchingCustomer: true,
    customerRedemptions: null,
    sessionCode: "",
    publishedVouchers: null,
  };

  componentDidMount() {
    this.setState(loadItemsFromLocalStorage());
    this.init();
  }

  init = async () => {
    try {
      const session = await fetch(`${process.env.REACT_APP_API_URL}/init`, {
        credentials: "include",
      }).then((response) => response.json());

      let sessionCode = session.session;
      let publishedVouchers = session.coupons;
      this.setState({
        sessionCode: sessionCode,
        publishedVouchers: publishedVouchers,
      });
      localStorage.setItem("sessionCode", JSON.stringify(sessionCode));
      localStorage.setItem(
        "publishedVouchers",
        JSON.stringify(publishedVouchers)
      );
      this.getCustomers();
    } catch (e) {
      console.log(e);
    }
  };

  createCustomers = async () => {
    try {
      storeCustomers.forEach(async (customer) => {
        console.log(customer.source_id);
        await fetch(
          `${process.env.REACT_APP_API_URL}/create-customer/${this.state.sessionCode}${customer.source_id}`,
          {
            credentials: "include",
          }
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  getCustomers = async () => {
    try {
      this.setState({ fetchingCustomer: true });
      const customers = await Promise.all(
        storeCustomers.map((customer) => {
          return fetch(
            `${process.env.REACT_APP_API_URL}/customer/${this.state.sessionCode}${customer.source_id}`,
            {
              include: "credentials",
            }
          ).then((cust) => cust.json());
        })
      );
      this.setState({
        customers: customers,
        fetchingCustomer: false,
      });

      localStorage.setItem("customers", JSON.stringify(customers));
    } catch (e) {
      console.log(e);
    }
  };

  //Simple sleep function for fetching data
  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  getRedemptions = async (id) => {
    console.log(id);
    const customerRedemptions = {};
    let redemptions = await fetch(
      `${process.env.REACT_APP_API_URL}/redemptions/${id}`,
      {
        credentials: "include",
      }
    ).then((redemptions) => redemptions.json());

    //Count reedemed codes
    for (let i = 0; i < redemptions.length; i++) {
      customerRedemptions[redemptions[i].voucher.code] =
        (customerRedemptions[redemptions[i].voucher.code] || 0) + 1;
    }
    Object.keys(customerRedemptions).map((key) => ({
      [key]: customerRedemptions[key],
    }));

    return customerRedemptions;
  };

  setCustomer = async (id) => {
    console.log(id);
    try {
      //Get customer data, start spinner
      this.setState({ fetchingCustomer: true });
      let customer = await fetch(
        `${process.env.REACT_APP_API_URL}/customer/${id}`,
        {
          credentials: "include",
        }
      ).then((x) => x.json());
      let customerRedemptionsList = await this.getRedemptions(id);
      this.setState({
        customer: customer,
        fetchingCustomer: false,
        customerRedemptions: customerRedemptionsList,
      });
      localStorage.setItem("customer", JSON.stringify(customer));
      localStorage.setItem("fetchingCustomer", JSON.stringify(false));
      localStorage.setItem(
        "customerRedemptions",
        JSON.stringify(customerRedemptionsList)
      );
      console.log(customer);
    } catch (e) {
      console.log(e);
    }
  };

  getCode = (camp_name) => {
    let customer = this.state.customer.source_id;
    let campaing = camp_name;

    let customerVouchers = this.state.publishedVouchers.find(
      (voucher) => voucher.customer === customer
    );

    let customerCampaigns = customerVouchers.campaings.find(
      (camp) => camp.campaign === campaing
    );

    return customerCampaigns.code;
  };
  updateCustomerData = async (id) => {
    console.log(id);
    try {
      //Get customer data, start spinner
      this.setState({ fetchingCustomer: true });
      let customer = await fetch(
        `${process.env.REACT_APP_API_URL}/customer/${id}`,
        {
          credentials: "include",
        }
      ).then((x) => x.json());
      console.log(customer);
      //Check if customer data has not updated
      if (
        customer.summary.redemptions.total_redeemed ===
        this.state.customer.summary.redemptions.total_redeemed
      ) {
        //If true -> wait
        await this.sleep(5000);
        this.updateCustomerData(id);
      } else {
        this.setCustomer(id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  getCustomer = () => {
    return this.state.customers.find(
      (customer) => this.state.customer === customer.name
    );
  };

  render() {
    return (
      <CustomerContext.Provider
        value={{
          ...this.state,
          setCustomer: this.setCustomer,
          getCustomer: this.getCustomer,
          getCustomers: this.getCustomers,
          getRedemptions: this.getRedemptions,
          updateCustomerData: this.updateCustomerData,
          getCode: this.getCode,
        }}
      >
        {this.props.children}
      </CustomerContext.Provider>
    );
  }
}

const CustomerConsumer = CustomerContext.Consumer;

export { CustomerProvider, CustomerConsumer };
