import React, { Component } from "react";
// import { storeCustomers } from "../data";
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

  getCustomers = async () => {
    try {
      let customers = await fetch("/customers", {
        credentials: "include",
      }).then((x) => x.json());
      this.setState({
        customers: customers.customers,
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Simple sleep function for fetching data
  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  setCustomer = async (id) => {
    const customerRedemptions = {};
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
        this.setCustomer(id);
      } else {
        //If false (has changed) -> get redemptions
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
        this.setState({
          customer: customer,
          fetchingCustomer: false,
          customerRedemptions: customerRedemptions,
        });
        localStorage.setItem("customer", JSON.stringify(customer));
        localStorage.setItem("fetchingCustomer", JSON.stringify(false));
        localStorage.setItem(
          "customerRedemptions",
          JSON.stringify(customerRedemptions)
        );
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
        }}
      >
        {this.props.children}
      </CustomerContext.Provider>
    );
  }
}

const CustomerConsumer = CustomerContext.Consumer;

export { CustomerProvider, CustomerConsumer };
