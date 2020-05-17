import React, { Component } from "react";
import storeCustomers from "../storeCustomers";
import _ from "lodash";

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
  };
};

class CustomerProvider extends Component {
  state = {
    customer: null,
    sidebar: true,
    customers: [],
    fetchingCustomer: true,
    customerRedemptions: null,
  };

  componentDidMount() {
    this.setState(loadItemsFromLocalStorage());
    this.getCustomers();
  }

  createCustomers = async () => {
    try {
      storeCustomers.forEach(async (customer) => {
        await fetch(`/create-customer/${customer.source_id}`, {
          credentials: "include",
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  getCustomers = async () => {
    const customers = await Promise.all(
      storeCustomers.map((customer) => {
        return fetch(`/customer/${customer.source_id}`, {
          include: "credentials",
        }).then((cust) => cust.json());
      })
    );
    console.log(customers)
    this.setState({
      customers: customers,
    });
    localStorage.setItem("customers", JSON.stringify(customers));
  };

  //Simple sleep function for fetching data
  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  getRedemptions = async (id) => {
    const customerRedemptions = {};
    let redemptions = await fetch(`/redemptions/${id}`, {
      credentials: "include",
    }).then((redemptions) => redemptions.json());

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
    try {
      //Get customer data, start spinner
      this.setState({ fetchingCustomer: true });
      let customer = await fetch(`/customer/${id}`, {
        credentials: "include",
      }).then((x) => x.json());
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
    } catch (e) {
      console.log(e);
    }
  };

  updateCustomerData = async (id) => {
    try {
      //Get customer data, start spinner
      this.setState({ fetchingCustomer: true });
      let customer = await fetch(`/customer/${id}`, {
        credentials: "include",
      }).then((x) => x.json());
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
          getRedemptions: this.getRedemptions,
          updateCustomerData: this.updateCustomerData,
        }}
      >
        {this.props.children}
      </CustomerContext.Provider>
    );
  }
}

const CustomerConsumer = CustomerContext.Consumer;

export { CustomerProvider, CustomerConsumer };
