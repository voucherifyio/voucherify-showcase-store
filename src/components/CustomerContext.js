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
  };
};

class CustomerProvider extends Component {
  state = {
    customer: null,
    sidebar: true,
    customers: [],
    fetchingCustomer: true,
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
  
  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  setCustomer = async (id) => {
    try {
      this.setState({ fetchingCustomer: true });
      let customer = await fetch(`/customer/${id}`, {
        credentials: "include",
      }).then((x) => x.json());
      if (
        customer.summary.redemptions.total_redeemed ===
        this.state.customer.summary.redemptions.total_redeemed
      ) {
        await this.sleep(5000);
        this.setCustomer(id);
      } else {
        this.setState({
          customer: customer,
          fetchingCustomer: false,
        });
        localStorage.setItem("customer", JSON.stringify(customer));
        localStorage.setItem("fetchingCustomer", JSON.stringify(false));
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
