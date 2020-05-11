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
  };
};

class CustomerProvider extends Component {
  state = {
    customer: null,
    sidebar: true,
    customers: [],
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

  setCustomer = (name) => {
    this.setState({
      customer: name,
    });
    localStorage.setItem("customer", JSON.stringify(name));
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
